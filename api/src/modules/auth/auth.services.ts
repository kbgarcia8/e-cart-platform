import * as repo from './auth.repo';
import type { SignUpData } from './auth.types';

export async function signup(data:SignUpData) {
    const user = await repo.createUserByLocal(data);

    return {
        user: {
            id: user.id,
            email: user.email,
            isVerified: user.isVerified
        }
    }
};