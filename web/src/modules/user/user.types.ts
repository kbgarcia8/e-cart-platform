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

export const Methods = {
    COD: "Cash-on-Delivery",
    GCash: "G-Cash",
    PayMaya: "PayMaya",
    Bank_Transfer: "Bank Transfer",
    Credit_Card: "Credit Card"
} as const;

export type PaymentMethods = typeof Methods[keyof typeof Methods];