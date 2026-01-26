import type { LoginFormData, SignUpData, AuthResponse } from "./auth.types";

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

export async function signupApi(SignUpData: SignUpData): Promise<AuthResponse> {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(SignUpData),
        credentials: "include"
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
    }
    
    return response.json();
}
