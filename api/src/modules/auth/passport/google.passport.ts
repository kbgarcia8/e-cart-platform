import passport from "passport";
import "dotenv/config";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import prisma from "lib/prisma";
import { mapToAuthUserDTO } from 'modules/auth/auth.utils';

export default function googleStrategy () {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: 'http://localhost:4000/auth/google/oauth', //? OAuth callback URL – Google redirects here after authentication
        },
        async (accessToken, refreshToken, profile: Profile, done: VerifyCallback) => { //?accessToken and refreshToken here is of use for Google itself and must not be confused with issuance of JWT
          try {
            const email = profile._json.email || '';
            if (!email) {
              return done(null, false, { message: "No email from Google" });
            }

            if (!profile._json.email_verified) {
              return done(null, false, { message: "Google email is not verified" });
            }

            const username = email.split('@')[0]; 
            //? Finding a query with a relation, use select
            const existingUser = await prisma.user.findUnique({
              where: { email: email },
              select: {
                id: true,
                email: true,
                role: true,
                isVerified: true,
                created_at: true,
                updated_at: true,
                profile: true,
                credentials: {
                  where: { provider: 'Google'},
                  select: {
                    id: true,
                    provider: true,
                    providerId: true
                  }
                }
              }
            });
            
            if(existingUser) {
              //? Using explicit check instead of replacing with prisma upsert for clearer branching logic
              // If user already has a Google credential
              const providers = existingUser.credentials.map(c => c.providerId)
              if(existingUser.credentials.length > 0 && providers.includes(profile.id)) {
                const retrievedUser = mapToAuthUserDTO(existingUser)
                return done(null, retrievedUser);
              } else {
                //? Utilize upsert if you want to:
                //If user exists but does not have Google credential
                //1. Check if query exists
                //2. Update (if applicable) if query exists - leave as update: {} if no update
                //3. Create if query does not exist
                await prisma.userCredentials.upsert({
                  where: {
                    provider_providerId: {
                      provider: 'Google',
                      providerId: profile.id
                    }
                  },
                  update: {},
                  create: {
                    userId: existingUser.id,
                    provider: 'Google',
                    providerId: profile.id
                  }
                });
                const userWithGoogleCredentials = mapToAuthUserDTO(existingUser);
                return done(null, userWithGoogleCredentials);
              }
            } else {
              const createUserWithGoogle = await prisma.user.create({
                data: {
                  email: email,
                  isVerified: profile._json.email_verified || false,
                  profile: {
                    create: {
                      firstName: profile._json.given_name ?? '',
                      lastName: profile._json.family_name ?? '',
                      username: username ?? ''
                    }
                  },
                  credentials: {
                    create: {
                      provider: 'Google',
                      providerId: profile.id,
                    }
                  }
                },
                select: {
                  id: true,
                  email: true,
                  role: true,
                  isVerified: true,
                  created_at: true,
                  updated_at: true,
                  profile: true,
                  credentials: true
                }
              });
              const createdUserWithGoogle = mapToAuthUserDTO(createUserWithGoogle);
              return done(null, createdUserWithGoogle);
            }
          } catch (err) {
            return done(err);
          }
        }
    ))
};