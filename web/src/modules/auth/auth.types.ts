export const Role = {
    Member: "Member",
    Admin: "Admin",
    Guest: "Guest"
} as const;

export type Role = typeof Role[keyof typeof Role];

export type LoginFormData = {
    email: string;
    password: string;
}

type UserProfile = {
    firstname: string;
    lastname: string;
    username?: string;
}

export type UserCreateData = {
    email: string;
    role?: Role;
    isVerified?: boolean;
} & UserProfile

export type UserCreatedDTO = { 
    id: string; 
    email: string; 
    role: Role; 
    isVerified: boolean; 
    created_at: Date;
}