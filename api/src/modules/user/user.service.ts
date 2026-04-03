import * as repo from './user.repo';
import type { UserProfileFormDataDTO } from './user.types';

export async function updateUserDetails(data:UserProfileFormDataDTO) {
    try{
        const userId = await repo.updateUserProfile(data as UserProfileFormDataDTO);
        return userId;
    } catch (error) {
        throw error;
    }
}