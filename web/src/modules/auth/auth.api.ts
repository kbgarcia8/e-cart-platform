import type { LoginFormData, UserCreateData, UserCreatedDTO, LoggedUser } from "./auth.types";
import type { ApiResponse } from "shared/type/shared.types";

export async function signupApi(SignUpData: UserCreateData): Promise<ApiResponse<UserCreatedDTO>> {
    const response = await fetch(`${import.meta.env.VITE_DEV_API_URL}/auth/signup/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(SignUpData),
        credentials: "include"
    });
    
    const data = await response.json() as ApiResponse<UserCreatedDTO>;

    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Signup failed");
    }
    return data;
}

//! Any code below needs revision
export async function loginApi(loginData: LoginFormData): Promise<ApiResponse<LoggedUser>> {
    const response = await fetch(`${import.meta.env.VITE_DEV_API_URL}/auth/login/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(loginData),
        credentials: "include"
    });

    const data = await response.json() as ApiResponse<LoggedUser>;

    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Login failed");
    }

    return data;
};
