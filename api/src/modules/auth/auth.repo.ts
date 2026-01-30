import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient, Role, Providers } from "prisma/schema/generated/prisma/index";
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
        console.log("User created successfully!");
        //Generate token and call sendVerificationEmail
        await sendVerificationToken(newUser.id, userdata.email)
        return newUser;

    } catch (error){
        console.error("Prisma Database error in createUser:", error);
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
            console.log("Email Verification send to Email");
        } catch (error) {
            console.error("Verification Token creation error in :", error);

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
}

export async function findVerificationToken(token: string):Promise<FindVerificationToken> {
    try {
        const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
            where: { token: token as string },
            include: { user: true },
        });
        return verificationToken;
        
    } catch (error){
        console.error("Prisma Database error in findVerificationToken:", error);
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
        } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            throw new PrismaError<PrismaErrorDetails>(
                error.message,
                '1000',
                "PRISMA_VERIFICATION_TOKEN_FAILED",
                {
                    model: 'User and VerificationToken',
                    clientVersion: error.clientVersion
                }
            );
        } else if (error instanceof Error) {
            throw new AppError<{cause:string}>(
                "Unknown error occurred while verifying user",
                '500',
                "UNKOWN_ERROR",
                { cause: error?.message }
            );
        }
    }
    throw new AppError("createUser failed without throwing an error", '500', "UNKNOWN_ERROR");
}