import type { LoginFormData, SignupFormData, AuthResponse } from "./authentication.types";

export async function loginApi(loginData: LoginFormData): Promise<AuthResponse> {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include"
    })

    if (!res.ok) throw new Error("Login failed")
        return res.json()
    }

    export async function signupApi(signupData: SignupFormData): Promise<AuthResponse> {
    const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
        credentials: "include"
    })

    if (!res.ok) throw new Error("Signup failed")
    
    return res.json()
}
