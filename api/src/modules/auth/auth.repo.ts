import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, Providers } from "prisma/schema/generated/prisma/index";
import { PrismaError, AuthError } from "shared/errors/errors";
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
        if (error instanceof Error) {
            throw new PrismaError(
            "Failed to create user in database",
            409,
            "PRISMA_CREATE_USER_FAILED",
            { detail: { message: error.message } }
            );
        }

        throw new PrismaError(
            "Failed to create user in database",
            409,
            "PRISMA_CREATE_USER_FAILED",
            { detail: { message: "Unknown error" } }
        );
    }   
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
                throw new AuthError(
                    "Failed to send verification token in email",
                    409,
                    "VERIFICATION_TOKEN_NOT_SENT",
                    { detail: { message: error.message } }
                );
            }

            throw new AuthError(
                "Unknown error occurred while sending verification token",
                409,
                "UNKOWN_ERROR"
            );
        }
}

export async function findVerificationToken(token: string):Promise<FindVerificationToken|null> {
    try {
        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token: token as string },
            include: { user: true },
        });
        return verificationToken
    } catch (error) {
        console.error("Prisma Database error in findVerificationToken:", error);
        if (error instanceof Error) {
            throw new PrismaError(
                "Failed to retrieve token it may not exist or is expired",
                409,
                "VERIFICATION_TOKEN_NOT_FOUND",
                { detail: { message: error.message } }
            );
        }
        throw new PrismaError(
            "Unknown error occurred while retrieving verification token",
            500,
            "UNKNOWN_ERROR"
        );
    }
}