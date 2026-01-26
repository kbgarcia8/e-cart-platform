import { PrismaClient, Role, Providers } from "prisma/schema/generated/prisma/index";
import { PrismaError } from "shared/errors/errors";
import type { UserCreateLocal, UserCreatedReturn } from "./auth.types";

const prisma = new PrismaClient();

export async function createUserByLocal(userdata:UserCreateLocal):Promise<UserCreatedReturn> {
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
                create: [{
                    provider: Providers.Local,
                    passwordHash: userdata.password,
                    providerId: null
                }]
            }
        }

        const newUser = await prisma.user.create({ data });
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