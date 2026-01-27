import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, Providers } from "prisma/schema/generated/prisma/index";
import { PrismaError } from "shared/errors/errors";
import type { UserCreateData, UserCreatedReturn } from "./auth.types";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false }, //for access denied error due to SSL/TSL
});

const prisma = new PrismaClient({ adapter });

export async function createUser(userdata:UserCreateData):Promise<UserCreatedReturn> {
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
}