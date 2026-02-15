import "dotenv/config";
import { NextFunction, Response, Request } from "express";
import { AuthError } from "shared/errors/errors";
import { AuthErrorDetails } from "shared/errors/errors.types";
import * as userService from './user.service';

export const dashboardGet = (req:Request, res:Response) => {
    const user = req.user;

    if(!user) {
        throw new AuthError<AuthErrorDetails>(
            "Verification email sent. Please verify before logging in.",
            '409',
            "EMAIL_NOT_VERIFIED",
            { reason: "New verification email sent" }
        );
    }

    res.status(200).json({
        code: 200,
        success: true,
        message: `Welcome back ${user}`,
        data: user
    });
};