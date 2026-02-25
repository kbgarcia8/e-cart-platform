import { Router } from "express";
import * as authMiddleware from "./auth.middlewares";
import * as authController from "./auth.controllers";

const authRouter = Router();

authRouter.post('/signup/local', authMiddleware.signupValidator, authMiddleware.deepEmailValidation, authController.signupLocalPost);
authRouter.get("/verify", authController.verifyEmail);
authRouter.post("/login/local", authMiddleware.loginValidator, authController.loginLocalPost);
authRouter.get("/google", authMiddleware.googleAuth); //? Redirects to Google's official login
authRouter.get("/google/oauth", authController.loginGoogleGet); // Verification and issuance of JWT
authRouter.get("/logout", authMiddleware.requireAuth, authController.logout); //! Check if need ng requireAuth since inside protected route
//authRouter.get("/dashboard", authMiddleware.requireAuth); //! Must be moved to usersModule, this is for test only- enable for testing in auth

export default authRouter;