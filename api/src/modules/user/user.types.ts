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

export type PaymentMethod =
    {
        id: string;
        isSelected: boolean;
    } &
    ( {
        type: "COD";
        address: string;
        contact_person: string;
        contact_number: string;
    }
    | {
        type: "GCash" | "PayMaya";
        ewallet_account_name: string;
        ewallet_number: string;
    }
    | {
        type: "Bank_Transfer";
        bank_name: string;
        account_name: string;
        account_number: string;
    }
    | {
        type: "Credit_Card";
        bank_name: string;
        account_name: string;
        account_number: string;
        expiry: string;
        cvv: string;
    });

export type userPaymentMethodsDetails = {
    userId: string;
    methods: PaymentMethod[]
}

export type userPaymentMethodsDetailsDTO = PaymentMethod & {
    id: string;
    isSelected: boolean
    created_at: Date
    updated_at: Date
}