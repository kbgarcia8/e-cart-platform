import { Router } from "express";
import { signupValidator, deepEmailValidation } from "./auth.middlewares";
import * as authController from "./auth.controllers";

const authRouter = Router();

authRouter.post('/signup/local', signupValidator, deepEmailValidation, authController.signupLocalPost);
authRouter.get("/verify", authController.verifyEmail);

export default authRouter;