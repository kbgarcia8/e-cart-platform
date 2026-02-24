import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, logoutApi, signupApi } from "./auth.api";
import type { LoginFormData, UserCreateData } from "./auth.types";

export function useLogin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = useCallback(async (payload: LoginFormData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginApi(payload)
            if (response) {
                navigate("/user/dashboard");
            }
        } catch (err) {
            if(err instanceof Error) {
                const message = err?.message || "Something went wrong during login";
                setError(message);
                throw err;
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
            if (response) {
                navigate("/auth/signup");
                setSuccessSignup(true);
            }
        } catch (err) {
            if(err instanceof Error) {
                const message = err?.message || "Something went wrong during signup";
                setError(message);
                throw err;
            }
        } finally {
            setLoading(false)
        }
    }, [navigate])

    return { signup, loading, successSignup, error }
};

export function useLogout() {
    const navigate = useNavigate();
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const logout = useCallback(async () => {
        setLogoutLoading(true);
        try {
            const response = await logoutApi();
            if (response) {
                navigate("/auth/login");
            }
        } catch (err) {
            if(err instanceof Error) {
                const message = err?.message || "Something went wrong during logout";
                setError(message);
                throw err;
            }
        } finally {
            setLogoutLoading(false)
        }
    }, [navigate]);

    return { logout, logoutLoading }
}