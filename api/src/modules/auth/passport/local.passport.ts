import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import * as repo from 'modules/auth/auth.repo';

export default function localStrategy () {
    passport.use(new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                const retrievedUser = await repo.findUserByEmail(email);
                if (!retrievedUser) return done(null, false, { message: 'User not found' });

                const localProvider = retrievedUser.credentials.find(credential => credential.provider === "Local");
                if (!localProvider) return done(null, false, { message: "Sign in with email is not enabled for this user" });

                const isLocalPasswordMatch = await bcrypt.compare(password, localProvider?.passwordHash!);
                if(!isLocalPasswordMatch) return done(null, false, { message: "Invalid credentials" });
                
                return done(null, retrievedUser);
            } catch (err) {
                return done(err); //? throws from repo goes here
            }
        }
    ))
};