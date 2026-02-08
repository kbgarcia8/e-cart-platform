import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([
            req => req?.cookies?.access_token
        ]),
            secretOrKey: process.env.JWT_SECRET!,
        },
        async (payload, done) => {
            return done(null, payload);
        }
    )
);
