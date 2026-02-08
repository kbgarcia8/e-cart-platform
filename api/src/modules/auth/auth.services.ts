import * as repo from './auth.repo';
import type { SignupRequestDTO } from './auth.types';
import { AuthError } from 'shared/errors/errors';
import bcrypt from 'bcryptjs';
import { AuthErrorDetails } from 'shared/errors/errors.types';
import { User } from 'prisma/schema/generated/prisma';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';



export async function signup(data:SignupRequestDTO) {
    const { email, firstname, lastname, username, password } = data as SignupRequestDTO;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreateData = {
        firstname:firstname,
        lastname: lastname,
        username: username,
        email: email,
        passwordHash: hashedPassword,
        provider: "Local" as const,
        providerId: null
    }

    const finalUsername = (username?.trim() || email.split('@')[0]) as string;
    const userdata = {
        ...userCreateData,
        username: finalUsername
    }
    const user = await repo.createUser(userdata);

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
};

export async function login(user:User) {
    if(!user.isVerified) await repo.sendVerificationToken(user.id, user.email);
    
    const accessToken = jwt.sign({ sub: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '15m'});
    const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

    const { exp } = jwt.decode(refreshToken) as JwtPayload;

    await repo.saveRefreshToken(user.id, refreshToken, exp!);

    return {accessToken, refreshToken};
};

