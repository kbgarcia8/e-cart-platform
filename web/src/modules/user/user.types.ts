export interface UserProfileFormData {
    userId: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    profilePicture: string;
};

export interface userProfileUpdatedDTO {
    userId: string;
}