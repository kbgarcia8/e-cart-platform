import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { UserProfileFormData, userPaymentMethodsDetails } from "./user.types";
import { updateUserProfileApi, updateUserPaymentMethodsApi } from "./user.api";

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

export function usePaymentMethodsUpdate() {
    const navigate = useNavigate();
    const [loadingUserPaymentMethods, setLoadingUserPaymentMethods] = useState(false);
    const [paymentMethodsUpdateLoading, setPaymentMethodsUpdateLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const update = useCallback(async (data:userPaymentMethodsDetails) => {
        setPaymentMethodsUpdateLoading(true)
        setError(null)

        try {
            const response = await updateUserPaymentMethodsApi(data)
            if (response) {
                return response;
            }
        } catch (err) {
            if(err instanceof Error) {
                const message = err?.message || "Something went wrong during signup";
                setError(message);
                throw err;
            }
        } finally {
            setLoadingUserPaymentMethods(false)
        }
    },[navigate])

    return { update, loadingUserPaymentMethods }
}