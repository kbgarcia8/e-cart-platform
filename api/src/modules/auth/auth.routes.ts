import { Router, RequestHandler } from "express";
import { signupValidator } from "./auth.middlewares";
import { signupLocalPost } from "./auth.controllers";

const authRouter = Router();

authRouter.post('/signup/local', signupValidator, signupLocalPost);

export default authRouter;