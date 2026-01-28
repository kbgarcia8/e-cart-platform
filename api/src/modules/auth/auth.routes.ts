import { Router, Request, Response, NextFunction } from "express";
import { signupValidator } from "./auth.middlewares";
import { signupLocalPost } from "./auth.controllers";

const authRouter = Router();

//authRouter.post('/signup/local', signupValidator, signupLocalPost);
authRouter.post('/signup/local', (req:Request, _res:Response, next:NextFunction) => {
  //console.log("Signup body:", req.body);
  next();
}, signupValidator, signupLocalPost);

export default authRouter;