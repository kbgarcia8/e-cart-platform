import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import * as repo from 'modules/auth/auth.repo';
import { AuthError } from 'shared/errors/errors';
import { AuthErrorDetails } from 'shared/errors/errors.types';

export const localStrategy = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
        try {
            const retrievedUser = await repo.findUserByEmail(email);
            if (!retrievedUser) return done(null, false, { message: 'User not found' });

            const localProvider = retrievedUser.credentials.find(credential => credential.provider === "Local");
            if (!localProvider) return done(null, false, { message: 'Local credentials not found' });

            const isLocalPasswordMatch = await bcrypt.compare(password, localProvider?.passwordHash!);
            if(!isLocalPasswordMatch) {
                throw new AuthError<AuthErrorDetails>(
                    "Incorrect/Invalid Password",
                    '535',
                    "VERIFICATION_INCORRECT_PASSWORD",
                    { reason: 'Password does not match for user' }
                );
            }
            
            return done(null, retrievedUser);
        } catch (err) {
            return done(err); //? throws from repo goes here
        }
    }
);
