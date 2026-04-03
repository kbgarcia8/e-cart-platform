import "dotenv/config";
import { NextFunction, Response, Request } from "express";
import { ExpressValError, AuthError } from "shared/errors/errors";
import { AuthErrorDetails, ExpressValidationErrorDetails } from "shared/errors/errors.types";
import * as userService from './user.service';
import { validationResult, FieldValidationError } from "express-validator";
import type { UserProfileFormDataDTO } from "./user.types";

export const loggedUser = async (req:Request, res:Response, next:NextFunction) => {
    //console.log(req.user)
    res.status(200).json({
        code: 200,
        success: true,
        message: `${req.user} logged`,
        data: req.user
    });
};

export const updateUserDetailsPost = async (req:Request, res:Response, next:NextFunction) => {
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

    const userDetailsUpdate = req.body as UserProfileFormDataDTO;
    try {
        const result = await userService.updateUserDetails(userDetailsUpdate);

        res.status(200).json({
            code: 200,
            success: true,
            message: 'User details updated successfully',
            data: result
        });
    } catch(err){
        next(err);
    }
};

export const userSettingsGet = (req:Request, res:Response) => {
    try{
        const user = req.user;
        if(!user) {
            throw new AuthError<AuthErrorDetails>(
                "Credentials invalid or expired when accessing user user settings.",
                '403',
                "CEREDENTIALS_INVALID",
                { reason: "Credentials invalid or expired" }
            );
        }

        res.status(200).json({
            code: 200,
            success: true,
            message: `Welcome back ${user} to your profile settings`,
            data: user
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};