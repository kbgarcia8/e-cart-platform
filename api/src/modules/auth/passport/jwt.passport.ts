import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([
                req => {
                    //console.log("Extracting JWT from cookie:", req.cookies?.access_token);
                    return req.cookies?.access_token;
                }
            ]),
            secretOrKey: process.env.JWT_SECRET!
        },
        async (payload, done) => {
            try {
                return done(null, {
                    sub: payload.sub,
                    email: payload.email,
                    role: payload.role
                });
            } catch (err) {
                return done(err, false);
            }
        }
    )
);

