import type { LoginFormData, UserCreateData, AuthResponse } from "./auth.types";

export async function loginApi(loginData: LoginFormData): Promise<AuthResponse<null>> {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include"
    })

    if (!response.ok) throw new Error("Login failed");
    return response.json();
}

export async function signupApi(SignUpData: UserCreateData): Promise<AuthResponse<null>> {
    //console.log(JSON.stringify(SignUpData))
    const response = await fetch(`${import.meta.env.VITE_DEV_API_URL}/auth/signup/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(SignUpData),
        credentials: "include"
    });
    
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
        //console.log(data);
        throw new Error(data.message || "Signup failed");
    }
    
    return data;
}
