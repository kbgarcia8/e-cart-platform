import { Router, RequestHandler } from "express";
import { signupValidator } from "./auth.middlewares";
import { signupPost } from "./auth.controllers";
import { ValidationChain } from "express-validator";

const authRouter = Router();

authRouter.post('/signup', signupValidator, signupPost);

export default authRouter;