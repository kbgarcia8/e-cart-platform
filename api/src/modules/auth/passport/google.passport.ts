import passport from "passport";
import "dotenv/config";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "lib/prisma";

export default function googleStrategy () {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: 'http://localhost:4000/auth/google/oauth', //? Where will Google go after authentication
        },
        async (accessToken, refreshToken, profile, done) => { //?accessToken and refreshToken here is of use for Google itself and must not be confused with issuance of JWT
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

/*
{
  provider: 'google',                // identity provider name
  id: 'xxxxxxxxxxxxxxxxxxxx',        // Google’s unique user ID
  displayName: 'Full Name',          // User’s full name
  name: {
    familyName: 'Last',
    givenName: 'First'
  },
  emails: [
    { value: 'user@example.com' }    // Email address(es)
  ],
  photos: [
    { value: 'https://photo.url...' } // Profile picture URL
  ],
  _raw: '…raw JSON string…',         // Raw response string
  _json: {                           // Full Google JSON fields
    id: 'xxxxxxxxxxxxxxxxxxxx',
    email: 'user@example.com',
    verified_email: true,
    name: 'Full Name',
    given_name: 'First',
    family_name: 'Last',
    picture: 'https://photo.url...',
    locale: 'en',
    …more fields from Google…
  }
}
*/