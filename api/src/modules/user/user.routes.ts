import { Router } from "express";
import { requireAuth } from "modules/auth/auth.middlewares";
import * as userController from './user.controller'

const userRouter = Router();

userRouter.get("/dashboard", requireAuth, userController.dashboardGet);

export default userRouter;