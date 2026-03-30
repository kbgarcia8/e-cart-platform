import passport from "passport";
import 'dotenv/config';
import { Strategy as FacebookStrategy, Profile } from "passport-facebook";
import prisma from "lib/prisma";
import { mapToAuthUserDTO } from "../auth.utils";

export default function facebookStrategy () {
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID!,
            clientSecret: process.env.FACEBOOK_APP_SECRET!,
            callbackURL: `${process.env.API_BASE_URL}/auth/facebook/access`,
            profileFields: ["id", "displayName", "name", "emails", "photos"]
        },
        async (accessToken, refreshToken, profile: Profile, done) => { //?accessToken and refreshToken here is of use for Facebook itself and must not be confused with issuance of JWT
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) {
                    return done(
                        new Error("Facebook account does not have a verified email")
                    );
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
                    where: { provider: 'Facebook'},
                    select: {
                        id: true,
                        provider: true,
                        providerId: true
                    }
                    }
                }
                });
                
                if(existingUser) {
                    await prisma.userCredentials.upsert({
                    where: {
                        provider_providerId: {
                        provider: 'Facebook',
                        providerId: profile.id
                        }
                    },
                    update: {},
                    create: {
                        userId: existingUser.id,
                        provider: 'Facebook',
                        providerId: profile.id
                    }
                    });
                    const userWithFacebookCredentials = mapToAuthUserDTO(existingUser);
                    return done(null, userWithFacebookCredentials);
                } else {
                const createUserWithFacebook = await prisma.user.create({
                    data: {
                    email: email,
                    isVerified: true, //? Facebook only returns verified email
                    profile: {
                        create: {
                            firstName: profile.name?.givenName ?? '',
                            lastName: profile.name?.familyName ?? '',
                            username: username ?? '',
                            profilePicture: profile.photos?.[0]?.value ?? 'https://images.unsplash.com/vector-1742875355318-00d715aec3e8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                    },
                    credentials: {
                        create: {
                        provider: 'Facebook',
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
                const createdUserWithFacebook = mapToAuthUserDTO(createUserWithFacebook);
                return done(null, createdUserWithFacebook);
                }
            } catch (err) {
                return done(err);
            }
        }
    ))
}