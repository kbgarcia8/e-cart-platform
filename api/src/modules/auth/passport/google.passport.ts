import passport from "passport";
import "dotenv/config";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import prisma from "lib/prisma";
import { ref } from "process";

export default function googleStrategy () {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: 'http://localhost:4000/auth/google/oauth', //? Where will Google go after authentication
        },
        async (accessToken, refreshToken, profile: Profile, done: VerifyCallback) => { //?accessToken and refreshToken here is of use for Google itself and must not be confused with issuance of JWT
          //TODO: Create user and UserCredentials
            /*if(profile) {
              const userExists = await prisma.user.findUnique({ where: {
                email: profile.emails?[0].value
              }})  
            }*/
            //
            //TODO: Re-shape object into AuthUser
            //
            // Perform any additional verification or user lookup here
            // and return the user object
            return done(null, profile);
        }
    ))
};