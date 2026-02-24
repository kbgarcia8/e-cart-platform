import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { validationResult, FieldValidationError } from "express-validator";
import passport from "passport";
import { ExpressValError, AuthError } from "shared/errors/errors";
import type { ExpressValidationErrorDetails, AuthErrorDetails } from "shared/errors/errors.types";
import * as authService from "./auth.services";
import type { SignupRequestDTO, PublicUser } from "./auth.types";
import jwt from 'jsonwebtoken';
import type { RefreshPayload } from "./auth.types";


export const signupLocalPost = async (req: Request, res: Response, next:NextFunction):Promise<void> =>{
        const validatorErrors = validationResult(req);
        if (!validatorErrors.isEmpty()) {
            const errors = validatorErrors.array();
            const errorMessages = errors.map((entry) => `• ${entry.msg}`).join("\n");
            const details = errors.filter((err): err is FieldValidationError => err.type === 'field')
                .map(err => ({
                    type: err.path,
                    msg: err.msg
                }));

            throw new ExpressValError<ExpressValidationErrorDetails>(
                errorMessages,
                '400',
                "EXPRESS_VAL_ERROR",
                details
            );
        }

        const signupRequest = req.body as SignupRequestDTO
        try{
            const result = await authService.signup(signupRequest);
            res.status(200).json({
                code: 200,
                success: true,
                message: 'User signup successful. Please verify email',
                data: result
            });
        } catch(err){
            next(err);
        }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    const { token } = req.query;
    try {
        const result = await authService.verifyEmail(token as string);
        if(result.isVerified) res.status(200).json({
            code: 200,
            success: true,
            message: "Email verified successfully. You can now login",
            data: result
        });
    } catch (err) {
        next(err);
    }
};

export const loginLocalPost = async (req:Request, res:Response, next:NextFunction) => {
    const validatorErrors = validationResult(req);
    if (!validatorErrors.isEmpty()) {
        const errors = validatorErrors.array();
        const errorMessages = errors.map((entry) => `• ${entry.msg}`).join("\n");
        const details = errors.filter((err): err is FieldValidationError => err.type === 'field')
            .map(err => ({
                type: err.path,
                msg: err.msg
            }));

        throw new ExpressValError<ExpressValidationErrorDetails>(
            errorMessages,
            '400',
            "EXPRESS_VAL_ERROR",
            details
        );
    }
    passport.authenticate("local", {session: false}, async (err:any, user:PublicUser | false | null,  info?: { message?: string }) => {
        if(err || !user) {
            return next (new AuthError<AuthErrorDetails>(
                "Incorrect/Invalid Password",
                '535',
                "AUTH_FAILED",
                { reason: info?.message || "Invalid credentials" }
            ))
        }
        try {
            const { accessToken, refreshToken, userData } = await authService.login(user, "Local");
            
            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 15 * 60 * 1000
            });

            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({
                code: 200,
                success: true,
                message: "Login via Email successful",
                data: userData
            });
        } catch (err) {
            next(err);
        }
    })(req, res, next);
};

// Google OAuth - OAuth callback handler.
// Passport executes the GoogleStrategy verify function first.
// After verify calls `done`, this custom callback receives (err, user).
export const loginGoogleGet = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", {session: false}, async (err:any, user:PublicUser | false | null) => {
        if(err || !user) {
            return next (new AuthError<AuthErrorDetails>(
                "Google Login Failed",
                '401',
                "AUTH_FAILED",
                { reason: "Invalid Google credentials" }
            ))
        }
        try {
            const { accessToken, refreshToken, userData } = await authService.login(user, "Google");
            
            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 15 * 60 * 1000
            });

            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            /*
            res.status(200).json({
                code: 200,
                success: true,
                message: "Login via Google successful",
                data: userData
            });
            */
            res.redirect(`${process.env.CLIENT_BASE_URL}/user/dashboard`);
        } catch (err) {
            next(err);
        }
    })(req, res, next); 
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //! Needs requireAuth to access existing cookies
        const currentRefreshToken = req.cookies.refresh_token;
        const currentAccessToken = req.cookies.access_token;
        if (!currentRefreshToken || !currentAccessToken) {
            return next (new AuthError(
                "Session already expired. User already logout or lacks access.",
                "401",
                "AUTH_REFRESH_FAILED",
                { reason: "Refresh or Access Token not found" }
            ));
        }

        const decoded = jwt.verify(
            currentRefreshToken,
            process.env.JWT_REFRESH_SECRET!
        ) as RefreshPayload;

        res.cookie("access_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0
        });

        res.cookie("refresh_token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 0
        });

        await authService.logout(decoded.sub);

        res.status(200).json({
            code: 200,
            success: true,
            message: "Logout User successful",
            data: ''
        });

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
}