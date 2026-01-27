import { Role, Providers } from "prisma/schema/generated/prisma";

type UserProfile = {
    firstname: string;
    lastname: string;
    username?: string;
}

export type SignupRequestDTO = {
    email: string;
    firstname: string;
    lastname: string;
    username?: string;
    password: string;
    confirmpassword: string;
};

type LocalCredentials = {
    provider: "Local";
    passwordHash: string;
    providerId: null;
};

type OAuthCredentials = {
    provider: "Facebook" | "Gmail";
    passwordHash: null;
    providerId: string;
};

type UserCredentials = LocalCredentials | OAuthCredentials;

export type UserCreateData = {
    email: string;
    role?: Role;
    isVerified?: boolean;
} & UserProfile & UserCredentials

export type UserCreatedReturn = { 
    id: string; 
    email: string; 
    role: Role; 
    isVerified: boolean; 
    created_at: Date;
}

// ! Below this comment are yet to be edited

export type LoginFormData = {
    email: string;
    password: string;
}

export type AuthUser = {
    id: string
    email: string
    fullName: string
}


export type AuthResponse = {
    user: AuthUser
    token: string
}