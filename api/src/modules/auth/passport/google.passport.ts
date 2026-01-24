import passport from "passport";
import "dotenv/config";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: 'http://localhost:4000/auth/google/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
        // Perform any additional verification or user lookup here
        // and return the user object
        return cb(null, profile);
    }
))