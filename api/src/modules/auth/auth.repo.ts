import prisma from "lib/prisma";
import { Prisma, Role, Providers, User } from "prisma/schema/generated/prisma/index";
import { AppError, PrismaError, AuthError } from "shared/errors/errors";
import { prismaCodeToMessage } from "shared/errors/errors.codes";
import type { PrismaErrorDetails, AuthErrorDetails } from "shared/errors/errors.types";
import type { UserCreateData, UserCreated } from "./auth.types";
import crypto from 'crypto';
import { sendVerificationEmail } from "./auth.utils";

export async function createUser(userdata:UserCreateData):Promise<UserCreated> {
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
                prismaCodeToMessage.createUser![`${error.code}`] ?? error.message,
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
                'P1001',
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
        
        const verificationToken = await prisma.verificationToken.findFirst({
            where: { token: token },
            include: { user: true },
        });

        if (!verificationToken) {
            const user = await prisma.user.findFirst({
                where: { isVerified: true }
            });

            if (user) {
                return user; // already verified → treat as success
            }

            throw new AuthError(
                "Verification failed. Invalid token",
                '400',
                "VERIFICATION_TOKEN_INVALID",
                { reason: 'Token is invalid or non-existent.' }
            );
        }
        
        // If token is expired
        if (verificationToken.expiresAt < new Date()) {
            await prisma.verificationToken.deleteMany({ where: { id: verificationToken.id } });
            throw new AuthError<AuthErrorDetails>(
                "Verification failed. Token is expired",
                '401',
                "VERIFICATION_TOKEN_EXPIRED",
                { reason: 'Token expired. Please request a new verification email.' }
            );
        }

        // If user already verified
        if (verificationToken.user.isVerified) {
            await prisma.verificationToken.deleteMany({
                where: { userId: verificationToken.userId },
            });

            throw new AuthError<AuthErrorDetails>(
                "Email already verified",
                '409',
                "EMAIL_ALREADY_VERIFIED",
                { reason: 'This email has already been verified.' }
            );
        }
        //! Add in LOGIN a case where token is not expired yet still not verified to remind user to verify

        // Update user status to verified
        const verifiedUser = await prisma.user.update({
            where: { id: verificationToken.userId },
            data: { isVerified: true },
        });

        // Delete the used token from the database
        await prisma.verificationToken.deleteMany({ where: { id: verificationToken.id } });

        return verifiedUser;
    } catch (error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new PrismaError<PrismaErrorDetails>(
                prismaCodeToMessage.verifyEmail![`${error.code}`] ?? error.message,
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
                'P1001',
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