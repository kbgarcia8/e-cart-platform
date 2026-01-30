import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient, Role, Providers, User } from "prisma/schema/generated/prisma/index";
import { AppError, PrismaError, AuthError } from "shared/errors/errors";
import type { PrismaErrorDetails, ExpressValidationErrorDetails, AuthErrorDetails } from "shared/errors/errors.types";
import type { UserCreateData, UserCreateDTO, FindVerificationToken } from "./auth.types";
import crypto from 'crypto';
import { sendVerificationEmail } from "./auth.utils";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false }, //for access denied error due to SSL/TSL
});

const prisma = new PrismaClient({ adapter });

export async function createUser(userdata:UserCreateData):Promise<UserCreateDTO> {
    try {
        const data = {
            email: userdata.email,
            role: userdata.role ?? Role.Member,
            isVerified: false,
            profile: {
                create: {
                    firstName: userdata.firstname ?? '',
                    lastName: userdata.lastname ?? '',
                    username: userdata.username as string
                }
            },
            credentials: {
                create: {
                    provider: userdata.provider as Providers,
                    passwordHash: userdata.passwordHash,
                    providerId: userdata.providerId
                }
            }
        }

        const newUser = await prisma.user.create({
            data,
            //? select here are data to be returned after create
            select: {
                id: true,
                email: true,
                role: true,
                isVerified: true,
                created_at: true,
            },
        });
        return newUser;

    } catch (error){
        
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError<PrismaErrorDetails>(
                error.message,
                error.code,
                "PRISMA_CREATE_USER_FAILED",
                {
                    model: 'User',
                    metaTarget: error.meta ? Array(String(error.meta.target)) : [],
                    clientVersion: error.clientVersion
                }
            );
        } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            throw new PrismaError<PrismaErrorDetails>(
                error.message,
                '1000',
                "PRISMA_CREATE_USER_FAILED",
                {
                    model: 'User',
                    clientVersion: error.clientVersion
                }
            );
        } else if (error instanceof Error) {
            throw new AppError<{cause:string}>(
                "Unknown error occurred while creating user",
                '500',
                "UNKOWN_ERROR",
                { cause: error?.message }
            );
        }
    }
    throw new AppError("createUser failed without throwing an error", '500', "UNKNOWN_ERROR");
};

export async function sendVerificationToken(id:string, email:string) {
    const token = crypto.randomBytes(32).toString('hex');
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1); //? Token valid for 1 hour

        await prisma.verificationToken.create({
            data: {
            token,
            userId: id,
            expiresAt: expirationDate,
            },
        });

        try {
            await sendVerificationEmail(email, token);
            
        } catch (error) {
            if (error instanceof Error) {
                throw new AuthError<AuthErrorDetails>(
                    "Failed to send verification token in email",
                    '535',
                    "VERIFICATION_TOKEN_NOT_SENT",
                    { reason: error.message }
                );
            } else {
                throw new AppError<{cause:string}>(
                    "Unknown error occurred while creating user",
                    '500',
                    "UNKOWN_ERROR",
                    { cause: String(error) }
                );
            }
        }
};

export async function verifyEmail(token: string):Promise<User> {
    try {
        const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
            where: { token: token as string },
            include: { user: true },
        });
        
        // If token is expired
        if (verificationToken.expiresAt < new Date()) {
            await prisma.verificationToken.delete({ where: { id: verificationToken.id } });
            throw new AuthError<AuthErrorDetails>(
                "Failed to send verification token in email",
                '401',
                "VERIFICATION_TOKEN_EXPIRED",
                { reason: 'Token expired. Please request a new verification email.' }
            );
        }
        //! Add here a case where token is not expired yet still not verified to remind user to verify

        // Update user status to verified
        await prisma.user.update({
            where: { id: verificationToken.userId },
            data: { isVerified: true },
        });

        // Delete the used token from the database
        await prisma.verificationToken.delete({ where: { id: verificationToken.id } });

        const verifiedUser = verificationToken.user;

        return verifiedUser;
    } catch (error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError<PrismaErrorDetails>(
                error.message,
                error.code,
                "PRISMA_VERIFICATION_TOKEN_FAILED",
                {
                    model: 'User and VerificationToken',
                    metaTarget: error.meta ? Array(String(error.meta.target)) : [],
                    clientVersion: error.clientVersion
                }
            );
        }
        
        if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            throw new PrismaError<PrismaErrorDetails>(
                error.message,
                '1000',
                "PRISMA_VERIFICATION_TOKEN_FAILED",
                {
                    model: 'User and VerificationToken',
                    clientVersion: error.clientVersion
                }
            );
        } 
        
        if (error instanceof Error) {
            throw error;
        }
    }
    throw new AppError("createUser failed without throwing an error", '500', "UNKNOWN_ERROR");
};