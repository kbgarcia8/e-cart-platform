import passport from "passport";
import "dotenv/config";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import prisma from "lib/prisma";
import {mapToAuthUserDTO} from 'modules/auth/auth.utils'

export default function googleStrategy () {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: 'http://localhost:4000/auth/google/oauth', //? Where will Google go after authentication
        },
        async (accessToken, refreshToken, profile: Profile, done: VerifyCallback) => { //?accessToken and refreshToken here is of use for Google itself and must not be confused with issuance of JWT
          try {
            const email = profile._json.email || '';
            if (!email) {
              return done(null, false, { message: "No email from Google" });
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
                    providerId: true
                  }
                }
              }
            });
            
            if(existingUser) {
              //! All condition inside can be replaced with upsert for cleaner version
              const providers = existingUser.credentials.map(c => c.providerId)
              if(existingUser.credentials.length > 0 && providers.includes(profile.id)) {
                const retrievedUser = mapToAuthUserDTO(existingUser)
                return done(null, retrievedUser);
              } else {
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
                }
              })
              const createdUserWithGoogle = mapToAuthUserDTO(createUserWithGoogle);
              return done(null, createdUserWithGoogle);
            }
          } catch (err) {
            return done(err);
          }
        }
    ))
};