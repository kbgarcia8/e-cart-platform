import "dotenv/config";
import { NextFunction, Response, Request } from "express";
import { AuthError } from "shared/errors/errors";
import { AuthErrorDetails } from "shared/errors/errors.types";
import * as userService from './user.service';

export const dashboardGet = (req:Request, res:Response) => {
    try{
        //ERROR here check this point
        const user = req.user;
        console.log("dashboardGet", user)
        if(!user) {
            throw new AuthError<AuthErrorDetails>(
                "Credentials invalid or expired when accessing user dashboard.",
                '403',
                "CEREDENTIALS_INVALID",
                { reason: "Credentials invalid or expired" }
            );
        }

        res.status(200).json({
            code: 200,
            success: true,
            message: `Welcome back ${user}`,
            data: user
        });
    } catch (err) {
        console.error("dashboardGet error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};