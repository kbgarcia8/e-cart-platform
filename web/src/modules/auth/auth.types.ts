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

export type UserCreateLocal = {
    email: string;
    password: string;
    confirmpassword: string;
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
