import { check } from 'express-validator';
import { validate } from 'deep-email-validator';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { DeepEmailValError, AuthError } from 'shared/errors/errors';
import type { DeepEmailValidationErrorDetails } from 'shared/errors/errors.types';
import type { JwtPayload, RefreshPayload } from './auth.types';
import jwt from "jsonwebtoken";
import * as repo from "modules/auth/auth.repo";
import { mapToAuthUserDTO } from './auth.utils';


export const signupValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required!').bail()
        .isEmail().withMessage('Please provide a valid email address!').bail()
        .normalizeEmail(),
    check('firstname')
        .trim()
        .notEmpty().withMessage('First Name is required!').bail()
        .isAlpha('en-US', { ignore: ' ' }).withMessage('First Name must contain alphabetic characters only!'),
    check('lastname')
        .trim()
        .notEmpty().withMessage('Last Name is required!').bail()
        .matches(/^[a-zA-Z0-9.\-]+$/).withMessage('Last Name can only contain letters, numbers, hypen and dots'),
    check('username')
        .trim()
        .optional({ checkFalsy: true })
        .isLength({min: 5, max: 35}).withMessage('Username must be atleast 5 characters and at max 35 characters!')
        .isAlphanumeric().withMessage('Username must contain alphanumeric characters only!'),
    check('password')
        .notEmpty().withMessage('Please provide a password!').bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 1,
            minNumbers: 1,
        }).withMessage('Password must be at least 8 characters and include uppercase, lowercase, and a symbol'),
    check('confirmpassword')
        .notEmpty().withMessage('Please confirm password!').bail()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match')
];

export const deepEmailValidation = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email } = req.body;

        const result = await validate({
            email,
            validateTypo: true,
            validateDisposable: true,
            validateMx: true,
            validateSMTP: false,
        });

        if (!result.valid) {
            throw new DeepEmailValError<DeepEmailValidationErrorDetails>(
                'Email not valid/deliverable/existent',
                '400',
                'EMAIL_NOT_DELIVERABLE',
                {
                    email,
                    reason: result.reason || 'Email failed deliverability checks / Invalid email address',
                }
            );
        }
        next();
    } catch (err) {
        next(err);
    }
};

export const loginValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required!').bail()
        .isEmail().withMessage('Please provide a valid email address!').bail()
        .normalizeEmail(),
    check('password')
        .notEmpty().withMessage('Please provide a password!').bail()
];

const tokenCheck = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return next (new AuthError(
                "Session expired. Please login again.",
                "401",
                "AUTH_REFRESH_FAILED",
                { reason: "Refresh Token not found" }
            ));
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!
        ) as RefreshPayload;

        const storedRefreshToken = await repo.findRefreshToken(decoded.sub);


        if (!storedRefreshToken) {
            return next(new AuthError(
                "Session expired. Please login again.",
                "401",
                "AUTH_REFRESH_INVALID",
                { reason: "Refresh token not found in database" }
            ));
        }

        if (storedRefreshToken.expiresAt < new Date()) {
            return next(new AuthError(
                "Session expired. Please login again.",
                "401",
                "AUTH_REFRESH_EXPIRED",
                { reason: "Refresh Token already Expired" }
            ));
        }

        const newRefreshToken = jwt.sign(
            { sub: decoded.sub },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: "7d" }
        );

        const { exp } = jwt.decode(newRefreshToken) as RefreshPayload;
        //? This is for continues renewal whenever user log in again before 7d expiration of current refreshtoken
        await repo.saveRefreshToken(decoded.sub, newRefreshToken, exp);

        const user = await repo.findPublicUserById(decoded.sub);

        const newAccessToken = jwt.sign({ sub: user?.id, email: user?.email, role: user?.role },process.env.JWT_SECRET!,{ expiresIn: "15m" });

        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const userData = mapToAuthUserDTO(user);

        req.user = userData;
        next();

    } catch (err) {
        return next(
            err instanceof AuthError
            ? err
            : new AuthError(
                "Session expired. Please login again.",
                "401",
                "AUTH_REFRESH_FAILED"
            )
        );
    }
};

export const requireAuth = async (req:Request, res:Response, next:NextFunction) => {
    passport.authenticate("jwt", { session: false }, async (err:any, user:JwtPayload, info?: { message?: string }) => {
        if (err) return next(err);

        if (!user) {
            await tokenCheck(req, res, next);
            return; 
        }

        const extractedUserData = await repo.findPublicUserById(user.sub); 
        const userData = mapToAuthUserDTO(extractedUserData);

        req.user = userData;
        next();
    })(req, res, next);
};
//? First to be executed via authRouter.get("/google", authMiddleware.googleAuth);
export const googleAuth = passport.authenticate('google', {scope: ["profile", "email"]},  //? Requested information from Google
    async (req:Request, res:Response) => {
    res.send(200);
});