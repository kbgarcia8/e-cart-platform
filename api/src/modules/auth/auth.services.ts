import * as repo from './auth.repo';
import type { UserCreateData } from './auth.types';

export async function signup(data:UserCreateData) {
    const user = await repo.createUser(data);

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

export async function verifyEmail(token:string){
    const verification = await repo.findVerificationToken(token);
    
}