import { Router } from "express";
import * as authMiddleware from "./auth.middlewares";
import * as authController from "./auth.controllers";

const authRouter = Router();

authRouter.post('/signup/local', authMiddleware.signupValidator, authMiddleware.deepEmailValidation, authController.signupLocalPost);
authRouter.get("/verify", authController.verifyEmail);
authRouter.post("/login", authMiddleware.loginValidator, authController.loginPost);
authRouter.post("/refresh", authMiddleware.refreshToken);
authRouter.get("/dashboard", authMiddleware.requireAuth);

export default authRouter;