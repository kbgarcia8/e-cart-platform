import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { UserProfileFormData } from "./user.types";
import { updateUserProfileApi } from "./user.api";

export function useProfileUpdate() {
    const navigate = useNavigate();
    const [profileUpdateLoading, setProfileUpdateLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const updateProfile = useCallback(async(payload:UserProfileFormData)=>{
        setProfileUpdateLoading(true);
        setError(null);
        try {
            const response = await updateUserProfileApi(payload)
            if (response) {
                navigate("/user/dashboard");
                return response;
            }
        } catch (err) {
            if(err instanceof Error) {
                const message = err?.message || "Something went wrong during login";
                setError(message);
                throw err;
            }
        } finally {
            setProfileUpdateLoading(false)
        }
    },[navigate])

    return{ updateProfile, profileUpdateLoading, error}
}