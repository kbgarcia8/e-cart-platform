import * as repo from './user.repo';
import type { UserProfileFormDataDTO, userPaymentMethodsDetails } from './user.types';

export async function updateUserDetails(data:UserProfileFormDataDTO) {
    try{
        const userId = await repo.updateUserProfile(data as UserProfileFormDataDTO);
        return userId;
    } catch (error) {
        throw error;
    }
}

export async function getUserPaymentMethods(id:string) {
    try{
        const paymentMethods = await repo.pullPaymentMethods(id);
        return paymentMethods;
    } catch (error) {
        throw error;
    }
}

export async function updateUserPaymentMethods(data:userPaymentMethodsDetails) {
    try {
        const userPaymentMethods = await repo.updateUserPaymentMethods(data)
        return userPaymentMethods
    } catch (error) {
        throw error;
    }
}