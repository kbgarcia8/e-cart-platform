
export type LoginFormData = {
    email: string;
    password: string;
}

export type SignupFormData = {
    email: string;
    password: string;
    confirmpassword: string;
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
