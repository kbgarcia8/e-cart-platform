import { Router } from "express";
import { signupValidator } from "./auth.middlewares";

const userRouter = Router();

userRouter.post('/signup', signupValidator)