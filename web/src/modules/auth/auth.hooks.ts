import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, signupApi } from "./auth.api";
import type { LoginFormData, SignUpData } from "./auth.types";

export function useLogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = useCallback(async (payload: LoginFormData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await loginApi(payload)

            if (response) {
                navigate("/dashboard");
            }
        } catch (error) {
            if(error instanceof Error) {
                const message = error?.message || "Something went wrong";
                setError(message);
                throw error;
            }
        } finally {
            setLoading(false)
        }
    }, [navigate])

    return { login, loading, error }
};

export function useSignup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const signup = useCallback(async (SignUpData: SignUpData) => {
        setLoading(true)
        setError(null)
        try {
            const response = await signupApi(SignUpData)

            if (response) {
                navigate("/login");
            }
        } catch (error) {
            if(error instanceof Error) {
                const message = error?.message || "Something went wrong";
                setError(message);
                throw error;
            }
        } finally {
            setLoading(false)
        }
    }, [navigate])

    return { signup, loading, error }
};
