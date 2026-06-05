import type { ApiResponse } from "shared/type/shared.types";
import type { UserProfileFormData, userProfileUpdatedDTO, userPaymentMethodsDetails, userPaymentMethodsDetailsDTO} from "./user.types";

export async function updateUserProfileApi(UserProfileDetails: UserProfileFormData) {
    const response = await fetch(`${import.meta.env.VITE_DEV_API_URL}/user/profile/details`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(UserProfileDetails),
        credentials: "include"
    });

    const data:ApiResponse<userProfileUpdatedDTO> = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Update user details failed");
    }

    return data;
}

export async function pullUserPaymentMethodsApi() {
    const response = await fetch(`${import.meta.env.VITE_DEV_API_URL}/user/profile/settings/payment-methods/pull`, {
        method: "GET",
        headers: { "Content-Type": "application/json"},
        credentials: "include"
    });
    
    const data:ApiResponse<userPaymentMethodsDetailsDTO[]> = await response.json();
    
    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Pull/Retrieval of User Payment Methods failed");
    }

    return data;
}

export async function updateUserPaymentMethodsApi(paymentMethodsDetails: userPaymentMethodsDetails) {
    
    const response = await fetch(`${import.meta.env.VITE_DEV_API_URL}/user/profile/settings/payment-methods/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(paymentMethodsDetails),
        credentials: "include"
    });
    
    const data:ApiResponse<userPaymentMethodsDetailsDTO[]> = await response.json();
    console.log(data)
    if (!response.ok) {
        console.log(data);
        throw new Error(data.message || "Update of User Payment Methods failed");
    }

    return data;
}