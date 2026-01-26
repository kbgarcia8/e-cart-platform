import { Role } from "prisma/schema/generated/prisma";

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

export type UserCreateLocal = {
    email: string;
    password: string;
    role?: Role;
    isVerified?: boolean;
} & UserProfile

export type SignUpData = UserCreateLocal

export type UserCreatedReturn = { email: string; id: string; role: Role; isVerified: boolean; created_at: Date; }

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