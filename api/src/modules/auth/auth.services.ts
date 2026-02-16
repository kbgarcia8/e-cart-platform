import * as repo from './auth.repo';
import type { SignupRequestDTO, PublicUser } from './auth.types';
import { AuthError } from 'shared/errors/errors';
import { AuthErrorDetails } from 'shared/errors/errors.types';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { mapToAuthUserDTO } from './auth.utils';

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

export async function login(user:PublicUser) {
    if(!user.isVerified) {
        try {
            await repo.sendVerificationToken(user.id, user.email);
        } catch (error) {
            throw error;
        }
        throw new AuthError<AuthErrorDetails>(
            "Verification email sent. Please verify before logging in.",
            '409',
            "EMAIL_NOT_VERIFIED",
            { reason: "New verification email sent" }
        );
    }
    
    //? Checking of refresh token and access token expiration done in middleware
    
    const accessToken = jwt.sign({ sub: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'production' ? '15m' : '1ms'});
    const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'production' ? "7d" : "10s"});
    
    const { exp } = jwt.decode(refreshToken) as JwtPayload;

    await repo.saveRefreshToken(user.id, refreshToken, exp!);   
    
    const extractedUserData = await repo.findPublicUserById(user.id);
    const userData = mapToAuthUserDTO(extractedUserData);

    return {accessToken, refreshToken, userData};
};