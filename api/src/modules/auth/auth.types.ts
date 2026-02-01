import { Role, Providers, User } from "prisma/schema/generated/prisma";

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

export type UserCreated = { 
    id: string; 
    email: string; 
    role: Role; 
    isVerified: boolean; 
    created_at: Date;
}

export type FindVerificationToken = {
    id: string; 
    token: string; 
    expiresAt: Date; 
    userId: string;
    user: User;
}

// ! Below this comment are yet to be edited

export type AuthUser = {
    id: string
    email: string
    fullName: string
}


export type AuthResponse = {
    user: AuthUser
    token: string
}