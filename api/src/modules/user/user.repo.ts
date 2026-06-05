import prisma from "lib/prisma";
import { Prisma } from "prisma/schema/generated/prisma";
import { AppError, PrismaError } from "shared/errors/errors";
import { prismaCodeToMessage } from "shared/errors/errors.codes";
import type { PrismaErrorDetails, AuthErrorDetails } from "shared/errors/errors.types";
import type { UserProfileFormDataDTO, userPaymentMethodsDetails, userPaymentMethodsDetailsDTO } from "./user.types";
import { mapToPaymentMethodDTO } from "./user.utils";

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

export async function pullPaymentMethods(userId:string):Promise<userPaymentMethodsDetailsDTO[]> {
    try{
        const userPaymentMethods = await prisma.userPaymentMethods.findMany({
            where: {
                userId: userId
            },
            select: {
                type: true,
                id: true,
                address: true,
                contactPerson: true,
                contactNumber: true,
                eWalletAccountName: true,
                eWalletAccountNumber: true,
                bankName: true,
                accountName: true,
                accountNumber: true,
                expiry: true,
                cvv: true,
                isSelected: true,
                created_at: true,
            }
        })
        const result = userPaymentMethods.map((method) => mapToPaymentMethodDTO(method))

        return result
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
                    "PRISMA_PULL_USERPAYMENTMETHODS_FAILED",
                    {
                        model: "UserPaymentMethods",
                        metaTarget: [field],
                        clientVersion: error.clientVersion
                    }
                )
        } else {
                throw new PrismaError<PrismaErrorDetails>(
                    prismaCodeToMessage.updateUserDetails![`${error.code}`] ?? error.message,
                    error.code,
                    "PRISMA_PULL_USERPAYMENTMETHODS_FAILED",
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
                "PRISMA_PULL_USERPAYMENTMETHODS_FAILED",
                {
                    model: 'UserPaymentMethods',
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
    throw new AppError("pullPaymentMethods failed without throwing an error", '500', "UNKNOWN_ERROR");
}

export async function updateUserPaymentMethods(userPaymentMethods:userPaymentMethodsDetails):Promise<userPaymentMethodsDetailsDTO[]> {
    try {
        const currentUserId = userPaymentMethods.userId
        const updatedMethods = []
        for (const method of userPaymentMethods['methods']) {
            const existingPaymentMethod = await prisma.userPaymentMethods.findFirst({
                where: {
                    userId: currentUserId,
                    type: method.type
                }
            })
            const updateData = {
                type: method.type
            }
            switch (method.type) {
                case 'COD':
                    Object.assign(updateData, {
                        address: method.address,
                        contactPerson: method.contact_person,
                        contactNumber: method.contact_number
                    });
                    break;

                case 'GCash':
                    Object.assign(updateData, {
                        eWalletAccountName: method.ewallet_account_name,
                        eWalletAccountNumber: method.ewallet_number,
                    });
                    break;

                case 'PayMaya':
                    Object.assign(updateData, {
                        eWalletAccountName: method.ewallet_account_name,
                        eWalletAccountNumber: method.ewallet_number,
                    });
                    break;

                case 'Bank_Transfer':
                    Object.assign(updateData, {
                        bankName: method.bank_name,
                        accountName: method.account_name,
                        accountNumber: method.account_number,
                    });
                    break;
                
                case 'Credit_Card':
                    Object.assign(updateData, {
                        bankName: method.bank_name,
                        accountName: method.account_name,
                        accountNumber: method.account_number,
                        expiry: method.expiry,
                        cvv: method.cvv
                    });
                    break
                
                default:
                    throw new Error(`Unsupported payment method type`);
            }

            let result
            if(existingPaymentMethod) { 
                result =  await prisma.userPaymentMethods.update({
                    where: {
                        userId: currentUserId,
                        id: existingPaymentMethod.id
                    },
                    data: {
                        ...updateData,
                        updated_at: new Date(),
                        isSelected: method.isSelected
                    },
                    select: {
                        type: true,
                        id: true,
                        address: true,
                        contactPerson: true,
                        contactNumber: true,
                        eWalletAccountName: true,
                        eWalletAccountNumber: true,
                        bankName: true,
                        accountName: true,
                        accountNumber: true,
                        expiry: true,
                        cvv: true,
                        isSelected: true,
                        updated_at: true,
                    }
                })
            } else {
                result =  await prisma.userPaymentMethods.create({
                    data: {
                        ...updateData,
                        isSelected: method.isSelected,
                        userId: currentUserId ,
                        created_at: new Date()
                    },
                    select: {
                        type: true,
                        id: true,
                        address: true,
                        contactPerson: true,
                        contactNumber: true,
                        eWalletAccountName: true,
                        eWalletAccountNumber: true,
                        bankName: true,
                        accountName: true,
                        accountNumber: true,
                        expiry: true,
                        cvv: true,
                        isSelected: true,
                        created_at: true,
                    }
                })
            }

            updatedMethods.push(mapToPaymentMethodDTO(result))
        }
        
        return updatedMethods
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
                    "PRISMA_UPDATE_USERPAYMENTMETHODS_FAILED",
                    {
                        model: "UserPaymentMethods",
                        metaTarget: [field],
                        clientVersion: error.clientVersion
                    }
                )
        } else {
                throw new PrismaError<PrismaErrorDetails>(
                    prismaCodeToMessage.updateUserDetails![`${error.code}`] ?? error.message,
                    error.code,
                    "PRISMA_UPDATE_USERPAYMENTMETHODS_FAILED",
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
                "PRISMA_UPDATE_USERPAYMENTMETHODS_FAILED",
                {
                    model: 'UserPaymentMethods',
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
    throw new AppError("updateUserPaymentMethods failed without throwing an error", '500', "UNKNOWN_ERROR");
}