import "dotenv/config";
import { NextFunction, Response, Request } from "express";
import { AuthError } from "shared/errors/errors";
import { AuthErrorDetails } from "shared/errors/errors.types";
import * as userService from './user.service';

export const loggedUser = async (req:Request, res:Response, next:NextFunction) => {
    //console.log(req.user)
    res.status(200).json({
        code: 200,
        success: true,
        message: `${req.user} logged`,
        data: req.user
    });
};

export const dashboardGet = (req:Request, res:Response) => {
    res.status(200).json({
        code: 200,
        success: true,
        message: `${req.user}'s dashboard`,
        data: req.user,
        redirectUrl: `${process.env.CLIENT_BASE_URL}/user/dashboard`
    });
};

export const userProfileGet = (req:Request, res:Response) => {
    res.status(200).json({
        code: 200,
        success: true,
        message: `${req.user} logged`,
        data: req.user,
        redirectUrl: `${process.env.CLIENT_BASE_URL}/user/profile`
    });
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

export const userDetailsGet = (req:Request, res:Response) => {
    res.status(200).json({
        code: 200,
        success: true,
        message: `${req.user}'s profile details`,
        data: req.user
    });
};