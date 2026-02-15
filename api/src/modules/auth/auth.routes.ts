import { Router } from "express";
import * as authMiddleware from "./auth.middlewares";
import * as authController from "./auth.controllers";

const authRouter = Router();

authRouter.post('/signup/local', authMiddleware.signupValidator, authMiddleware.deepEmailValidation, authController.signupLocalPost);
authRouter.get("/verify", authController.verifyEmail);
authRouter.post("/login/local", authMiddleware.loginValidator, authController.loginPost);
//authRouter.get("/dashboard", authMiddleware.requireAuth); //! Must be moved to usersModule, this is for test only- enable for testing in auth

export default authRouter;