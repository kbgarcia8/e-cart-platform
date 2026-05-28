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

export type PaymentMethods =
    typeof Methods[keyof typeof Methods];

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

export interface userUpdatePaymentMethodsDTO {
    
}