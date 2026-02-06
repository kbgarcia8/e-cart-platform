import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { validationResult, FieldValidationError } from "express-validator";
import bcrypt from 'bcryptjs';
import { ExpressValError } from "shared/errors/errors";
import type { ExpressValidationErrorDetails } from "shared/errors/errors.types";
import * as authService from "./auth.services";
import type { SignupRequestDTO, LoginRequestDTO } from "./auth.types";

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

        const { email, firstname, lastname, username, password } = req.body as SignupRequestDTO;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userCreateData = {
            firstname:firstname,
            lastname: lastname,
            username: username,
            email: email,
            passwordHash: hashedPassword,
            provider: "Local" as const,
            providerId: null
        }

        const finalUsername = (username?.trim() || email.split('@')[0]) as string;
        const userdata = {
            ...userCreateData,
            username: finalUsername
        }
        try{
            const result = await authService.signup(userdata);
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

    try {
        const { email, password } = req.body as LoginRequestDTO;
        
    } catch (error) {
        
    }
}