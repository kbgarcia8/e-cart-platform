import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { validationResult, FieldValidationError } from "express-validator";
import passport from "passport";
import { ExpressValError, AuthError } from "shared/errors/errors";
import type { ExpressValidationErrorDetails, AuthErrorDetails } from "shared/errors/errors.types";
import * as authService from "./auth.services";
import type { SignupRequestDTO, LoginRequestDTO, AuthUser } from "./auth.types";


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

export const loginPost = async (req:Request, res:Response, next:NextFunction) => {
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
    passport.authenticate("local", {session: false}, async (err:any, user:AuthUser | false | null,  info?: { message?: string }) => {
        if(err || !user) {
            return next (new AuthError<AuthErrorDetails>(
                "Incorrect/Invalid Password",
                '535',
                "AUTH_FAILED",
                { reason: info?.message || "Invalid credentials" }
            ))
        }
        try {
            const { accessToken, refreshToken } = await authService.login(user);
            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000
            });

            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({
                success: true,
                message: "Login successful"
            });
        } catch (err) {
            next(err);
        }
    })(req, res, next);
};