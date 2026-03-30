import type { ApiErrorDetails } from "./errors.types";

export type UserProfile = {
    firstname: string;
    lastname: string;
    username?: string;
    profilePicture?: string;
}

type Role = "Member" | "Guest" | "Admin"

export type ApiResponse<T> = {
    code: number;
    success: boolean;
    message: string;
    data?: T;
    errors?: ApiErrorDetails;
};

export interface AuthUserDTO {
    id: string;
    email: string;
    role: Role;
    isVerified: boolean;
    created_at: string;
    updated_at: string;
    username?: string | null;
    firstName: string;
    lastName: string;
    profilePicture?: string;
};