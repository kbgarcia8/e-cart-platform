import type { UserProfile } from "prisma/schema/generated/prisma"

export type UserDetailsUpdateData = Omit<UserProfile, "email">;

export interface UserProfileFormDataDTO {
    userId: string;
    firstname: string;
    lastname: string;
    username: string;
    profilePicture: string;
}