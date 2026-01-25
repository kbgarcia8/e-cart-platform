import { Request, response, Response } from "express";
import { signupValidator } from "./auth.middlewares";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import * as authService from "./auth.services";

const signupPost = [
    signupValidator, asyncHandler(async (req: Request, res: Response):Promise<Response<Record<string,any>>> =>{
        const validatorErrors = validationResult(req);
        if (!validatorErrors.isEmpty()) {
            return res.status(400).json(validatorErrors.array());
        }

        const { email, firstname, lastname, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userCreateData = {
            firstname:firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: hashedPassword,
        }

        if(username === '') {
            const temporaryUsername = email.split('@')[0];
            const userdata = {
                ...userCreateData,
                username: temporaryUsername
            }
            const result = await authService.signup(userdata);
            res.status(200).json(result);
        }
        else {
            const result = await authService.signup(userCreateData);
            res.status(200).json(result);
        }
        
    })
]