import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, signupApi } from "./auth.api";
import type { LoginFormData, UserCreateData } from "./auth.types";

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successSignup, setSuccessSignup] = useState(false);

    const signup = useCallback(async (SignUpData: UserCreateData) => {
        setLoading(true); //add a loader that pops when loading is true
        setError(null);
        setSuccessSignup(false);

        try {
            const response = await signupApi(SignUpData);
            console.log(response);
            if (response) {
                navigate("/auth/signup");
                setSuccessSignup(true);
            }
        } catch (err) {
            if(err instanceof Error) {
                const message = err?.message || "Something went wrong";
                setError(message);
                throw err;
            }
        } finally {
            setLoading(false)
        }
    }, [navigate])

    return { signup, loading, successSignup, error }
};
