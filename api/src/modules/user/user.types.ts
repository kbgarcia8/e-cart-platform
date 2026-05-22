import type { UserProfile } from "prisma/schema/generated/prisma"

export type UserDetailsUpdateData = Omit<UserProfile, "email">;
//* User profile details from frontend
export interface UserProfileFormDataDTO {
    userId: string;
    firstname: string;
    lastname: string;
    username: string;
    profilePicture: string;
}

//* Details of payment method from frontend
export const Methods = {
    COD: "Cash-on-Delivery",
    GCash: "G-Cash",
    PayMaya: "PayMaya",
    Bank_Transfer: "Bank Transfer",
    Credit_Card: "Credit Card"
} as const;


export type PaymentMethods = typeof Methods[keyof typeof Methods];

export type PaymentMethodDTO<T extends PaymentMethods> = {
    type: T;
    } 
    & (T extends "Cash-On-Delivery" ? {
        address: string;
        contact_person: string;
        contact_number: string;
    } : T extends "G-Cash"|"PayMaya" ? {
        ewallet_account_name: string;
        ewallet_number: string;
    }: T extends "Bank Transfer" ? {
        bank_name: string;
        account_name: string;
        account_number: string;
    } : T extends "Credit Card" ? {
        bank_name: string;
        account_name: string;
        account_number: string;
        expiry: string;
        cvv: string;
    }: never)