import { check } from 'express-validator';
import { validate } from 'deep-email-validator';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { DeepEmailValError, AuthError } from 'shared/errors/errors';
import type { DeepEmailValidationErrorDetails } from 'shared/errors/errors.types';
import jwt from "jsonwebtoken";
import * as repo from "modules/auth/auth.repo";


export const signupValidator = [
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required!').bail()
        .isEmail().withMessage('Please provide a valid email address!').bail()
        .normalizeEmail(),
    check('firstname')
        .trim()
        .notEmpty().withMessage('First Name is required!').bail()
        .isAlpha().withMessage('First Name must contain alphabetic characters only!'),
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

interface JwtPayload {
    sub: string;
    email?: string;
}

//TODO: fix checkauthentication

export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.access_token;

        if (accessToken) {
            try {
                const decoded = jwt.verify(
                    accessToken,
                    process.env.JWT_SECRET!
                ) as JwtPayload;

                req.user = { id: decoded.sub, email: decoded.email };
                return next();
            } catch (err) {
                // Token expired or invalid → fall through to refresh
            }
        }

        // 2. Try refresh token
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            throw new Error("No refresh token");
        }

        const storedToken = await repo.findRefreshToken(refreshToken);

        if (!storedToken || storedToken.expiresAt < new Date()) {
            throw new Error("Refresh token expired");
        }

        // 3. Issue new access token
        const newAccessToken = jwt.sign({ sub: storedToken.userId }, process.env.JWT_SECRET!, { expiresIn: "15m" });

        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
            path: "/"
        });

        req.user = { id: storedToken.userId };
        return next();

    } catch (err) {
        return next(
        new AuthError(
            "Authentication required",
            "401",
            "AUTH_FAILED",
            { reason: "Session expired. Please login again." }
        )
        );
    }
};
