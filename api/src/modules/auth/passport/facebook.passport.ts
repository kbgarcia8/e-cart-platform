import passport from "passport";
import 'dotenv/config';
import { Strategy as FacebookStrategy, Profile } from "passport-facebook";
import prisma from "lib/prisma";

export default function facebookStrategy () {
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID!,
            clientSecret: process.env.FACEBOOK_APP_SECRET!,
            callbackURL: `${process.env.API_BASE_URL}/auth/facebook/access`,
            profileFields: ["id", "emails", "last_name", "first_name", "username", "profile_pic"]
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            return done(null, profile);
        }
    ))
}