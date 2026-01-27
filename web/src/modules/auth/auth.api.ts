import type { LoginFormData, UserCreateData, AuthResponse } from "./auth.types";

export async function loginApi(loginData: LoginFormData): Promise<AuthResponse> {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include"
    })

    if (!response.ok) throw new Error("Login failed");
    return response.json();
}

export async function signupApi(SignUpData: UserCreateData): Promise<AuthResponse> {
    const response = await fetch(`${import.meta.env.VITE_DEV_API_URL}/auth/signup/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(SignUpData),
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
        // if the server sent an array of validation errors
        if (Array.isArray(data)) {
            const messages = data.map((err: any) => err.msg).join(", ");
            throw new Error(messages);
        }

        throw new Error(data.message || "Signup failed");
    }
    
    return response.json();
}
