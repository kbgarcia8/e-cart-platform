export const Role = {
    Member: "Member",
    Admin: "Admin",
    Guest: "Guest"
} as const;

export type Role = typeof Role[keyof typeof Role];

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
