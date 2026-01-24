import { Role } from "prisma/schema/generated/prisma";

export type LoginFormData = {
    email: string;
    password: string;
}

export type UserCreateLocal = {
    email: string;
    role: Role;
    password: string;
    isVerified: boolean;
}

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