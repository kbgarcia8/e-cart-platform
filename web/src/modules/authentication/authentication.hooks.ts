import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "./authentication.api";
import type { LoginFormData } from "./authentication.types";

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
            setError("Invalid credentials")
            throw error
        } finally {
            setLoading(false)
        }
    }, [navigate])

    return { login, loading, error }
};
