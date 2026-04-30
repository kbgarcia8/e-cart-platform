export interface UserProfileFormData {
    userId: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    profilePicture: string;
};

export interface userProfileUpdatedDTO {
    userId: string;
}

export const PaymentMethods = {
    COD: "COD",
    GCash: "GCash",
    PayMaya: "PayMaya",
    Bank_Transfer: "Bank_Transfer",
    Creadit_Card: "Creadit_Card"
} as const;

export type PaymentMethods = typeof PaymentMethods[keyof typeof PaymentMethods];