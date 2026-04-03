import type { ApiResponse } from "shared/type/shared.types";
import type { UserProfileFormData, userProfileUpdatedDTO } from "./user.types";

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