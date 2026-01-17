import type { LoginFormData, SignupFormData, AuthResponse } from "./authentication.types";

export async function loginApi(loginData: LoginFormData): Promise<AuthResponse> {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include"
    })

    if (!response.ok) throw new Error("Login failed")
        return response.json();
    }

    export async function signupApi(signupData: SignupFormData): Promise<AuthResponse> {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = response.json();
        throw errorData;
    }
    
    return response.json();
}
