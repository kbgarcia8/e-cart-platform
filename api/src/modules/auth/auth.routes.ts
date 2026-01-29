import { Router, Request, Response, NextFunction } from "express";
import { signupValidator } from "./auth.middlewares";
import * as authController from "./auth.controllers";

const authRouter = Router();

authRouter.post('/signup/local', signupValidator, authController.signupLocalPost);
authRouter.get("/verify", authController.verifyEmail);

export default authRouter;