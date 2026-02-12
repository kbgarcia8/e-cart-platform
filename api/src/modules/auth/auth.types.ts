import type { Role, User, UserCredentials, UserProfile } from "prisma/schema/generated/prisma";

type Profile = {
    firstname: string;
    lastname: string;
    username?: string;
};

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

type Credentials = LocalCredentials | OAuthCredentials;

export type UserCreateData = {
    email: string;
    role?: Role;
    isVerified?: boolean;
} & Profile & Credentials

export type UserCreated = { 
    id: string; 
    email: string; 
    role: Role; 
    isVerified: boolean; 
    created_at: Date;
};

export type LoginRequestDTO = {
    email: string;
    password: string;
};

export type AuthUser = User & UserCredentials & UserProfile;

export interface JwtPayload {
    sub: string;
    email?: string;
    role: Role;
};

export interface RefreshPayload {
    sub: string;
    exp: number;
};