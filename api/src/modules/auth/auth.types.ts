import type { Role, User, UserCredentials, UserProfile } from "prisma/schema/generated/prisma";
import { findPublicUserById } from "./auth.repo";

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

//? To make use of return type from a Promise/await function
export type PublicUser = Awaited<ReturnType<typeof findPublicUserById>>;

export type AuthUser = {
    id: string;
    email: string;
    role: Role;
    isVerified: boolean;
    created_at: string;
    updated_at: string;
    username?: string | null;
    firstName: string;
    lastName: string;
};

export interface JwtPayload {
    sub: string;
    email?: string;
    role: Role;
};

export interface RefreshPayload {
    sub: string;
    exp: number;
};