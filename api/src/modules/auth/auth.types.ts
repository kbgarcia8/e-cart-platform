import { Role } from "prisma/schema/generated/prisma";

export type LoginFormData = {
    email: string;
    password: string;
}

type UserProfile = {
    firstname: string;
    lastname: string;
    username: string;
}

export type UserCreateLocal = {
    email: string;
    role?: Role;
    password: string;
    isVerified?: boolean;
} & UserProfile

export type UserCreatedReturn = { email: string; id: string; role: Role; isVerified: boolean; created_at: Date; }

export type SignUpData = UserCreateLocal

export type AuthUser = {
    id: string
    email: string
    fullName: string
}


export type AuthResponse = {
    user: AuthUser
    token: string
}