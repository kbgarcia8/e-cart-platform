import prisma from "lib/prisma";
import { Prisma } from "prisma/schema/generated/prisma";
import { AppError, PrismaError } from "shared/errors/errors";
import { prismaCodeToMessage } from "shared/errors/errors.codes";
import type { PrismaErrorDetails, AuthErrorDetails } from "shared/errors/errors.types";
import type { UserProfileFormDataDTO, userPaymentMethodsDetails } from "./user.types";

export async function updateUserProfile(userDetailsData:UserProfileFormDataDTO):Promise<string> {
    try {
        const updateUserDetails = await prisma.userProfile.update({
            where: { userId: userDetailsData.userId},
            data: {
                firstName: userDetailsData.firstname,
                lastName: userDetailsData.lastname,
                profilePicture: userDetailsData.profilePicture,
                username: userDetailsData.username
            },
            select: {
                userId: true
            }
        })
        return updateUserDetails.userId;
        
    } catch (error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    let field = "field";
                    const meta = error.meta as any;
                    //? Due to adapter-pg errors.meta.target is attained through
                    const originalMessage = meta?.driverAdapterError?.cause?.originalMessage;
    
                    if (originalMessage) {
                        const match = originalMessage.match(/(.*?)_(.*?)_key/);
                        if (match?.[2]) {
                            field = match[2].charAt(0).toUpperCase() + match[2].slice(1);
                        }
                    }
    
                    throw new PrismaError(
                        `${field} already in use`,
                        error.code,
                        "PRISMA_UPDATE_USERDETAILS_FAILED",
                        {
                            model: "UserProfile",
                            metaTarget: [field],
                            clientVersion: error.clientVersion
                        }
                    )
            } else {
                    throw new PrismaError<PrismaErrorDetails>(
                        prismaCodeToMessage.updateUserDetails![`${error.code}`] ?? error.message,
                        error.code,
                        "PRISMA_UPDATE_USERDETAILS_FAILED",
                        {
                            model: 'User',
                            metaTarget: error.meta?.target as string[] || [],
                            clientVersion: error.clientVersion
                        }
                    );
                }
                
            } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
                throw new PrismaError<PrismaErrorDetails>(
                    error.message,
                    '500',
                    "PRISMA_UPDATE_USERDETAILS_FAILED",
                    {
                        model: 'UserProfile',
                        clientVersion: error.clientVersion
                    }
                );
            } else if (error instanceof Error) {
                throw new AppError<{cause:string}>(
                    "Unknown error occurred while updating user details",
                    '500',
                    "UNKOWN_ERROR",
                    { cause: error?.message }
                );
            }
        }
        throw new AppError("updateUserDetails failed without throwing an error", '500', "UNKNOWN_ERROR");
}

export async function updateUserPaymentMethods(userPaymentMethods:userPaymentMethodsDetails):Promise<string> {
    try {
        //TODO: CONTINUE HERE
        const currentUserId = userPaymentMethods.userId
        for (const method of userPaymentMethods['methods']) {
            const existingPaymentMethod = await prisma.userPaymentMethods.findFirst({
                where: {
                    userId: currentUserId,
                    id: method.id,
                    type: method.type
                }
            })
            let result
            if(existingPaymentMethod) {
                //result =  await prisma.userPaymentMethods.update({})
            }
        }
    } catch (error){
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    let field = "field";
                    const meta = error.meta as any;
                    //? Due to adapter-pg errors.meta.target is attained through
                    const originalMessage = meta?.driverAdapterError?.cause?.originalMessage;
    
                    if (originalMessage) {
                        const match = originalMessage.match(/(.*?)_(.*?)_key/);
                        if (match?.[2]) {
                            field = match[2].charAt(0).toUpperCase() + match[2].slice(1);
                        }
                    }
    
                    throw new PrismaError(
                        `${field} already in use`,
                        error.code,
                        "PRISMA_UPDATE_USERDETAILS_FAILED",
                        {
                            model: "UserProfile",
                            metaTarget: [field],
                            clientVersion: error.clientVersion
                        }
                    )
            } else {
                    throw new PrismaError<PrismaErrorDetails>(
                        prismaCodeToMessage.updateUserDetails![`${error.code}`] ?? error.message,
                        error.code,
                        "PRISMA_UPDATE_USERDETAILS_FAILED",
                        {
                            model: 'User',
                            metaTarget: error.meta?.target as string[] || [],
                            clientVersion: error.clientVersion
                        }
                    );
                }
                
            } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
                throw new PrismaError<PrismaErrorDetails>(
                    error.message,
                    '500',
                    "PRISMA_UPDATE_USERDETAILS_FAILED",
                    {
                        model: 'UserProfile',
                        clientVersion: error.clientVersion
                    }
                );
            } else if (error instanceof Error) {
                throw new AppError<{cause:string}>(
                    "Unknown error occurred while updating user details",
                    '500',
                    "UNKOWN_ERROR",
                    { cause: error?.message }
                );
            }
        }
        throw new AppError("updateUserDetails failed without throwing an error", '500', "UNKNOWN_ERROR");
}