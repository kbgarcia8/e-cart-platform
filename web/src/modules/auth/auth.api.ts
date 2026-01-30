import type { LoginFormData, UserCreateData, UserCreateDTO } from "./auth.types";
import type { ApiResponse } from "shared/type/shared.types";

export async function signupApi(SignUpData: UserCreateData): Promise<ApiResponse<UserCreateDTO>> {
    const response = await fetch(`${import.meta.env.VITE_DEV_API_URL}/auth/signup/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(SignUpData),
        credentials: "include"
    });
    
    const data = await response.json() as ApiResponse<UserCreateDTO>;
    console.log(data);

    if (!response.ok) {
        //console.log(data);
        throw new Error(data.message || "Signup failed");
    }
    return data;
}

//! Any code below needs revision
export async function loginApi(loginData: LoginFormData): Promise<ApiResponse<null>> {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include"
    })

    if (!response.ok) throw new Error("Login failed");

    return response.json();
};
