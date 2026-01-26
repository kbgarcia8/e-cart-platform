import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import * as authService from "./auth.services";
import type { SignupRequestDTO } from "./auth.types";

export const signupPost = async (req: Request, res: Response):Promise<void> =>{
        const validatorErrors = validationResult(req);
        if (!validatorErrors.isEmpty()) {
            res.status(400).json(validatorErrors.array());
            return;
        }

        const { email, firstname, lastname, username, password } = req.body as SignupRequestDTO;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userCreateData = {
            firstname:firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: hashedPassword,
        }

        const finalUsername = (username?.trim() || email.split('@')[0]) as string;
        const userdata = {
            ...userCreateData,
            username: finalUsername
        }
        
        const result = await authService.signup(userdata);
        res.status(200).json(result);
}