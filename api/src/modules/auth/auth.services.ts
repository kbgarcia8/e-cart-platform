import * as repo from './auth.repo';
import type { UserCreateData } from './auth.types';
import { AuthError } from 'shared/errors/errors';
import { AuthErrorDetails } from 'shared/errors/errors.types';

export async function signup(data:UserCreateData) {
    const user = await repo.createUser(data);

    await repo.sendVerificationToken(user.id, user.email);
    
    return {
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            created_at: user.created_at
        }
    }
};

export async function verifyEmail(token: string) {
    if (!token) {
        throw new AuthError<AuthErrorDetails>(
            "Missing Token",
            '403',
            "TOKEN_REQUIRED",
            { reason: 'Missing Token. Please request a new verification token.' }
        );
    }

    const user = await repo.verifyEmail(token);

    return {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified
    };
}