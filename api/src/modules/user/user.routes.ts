import { Router } from "express";
import { requireAuth } from "modules/auth/auth.middlewares";
import * as userController from './user.controller'

const userRouter = Router();

userRouter.get("/me", requireAuth, userController.loggedUser);
userRouter.get("/dashboard", requireAuth, userController.dashboardGet);
userRouter.get("/profile", requireAuth, userController.userProfileGet);
userRouter.get("/profile/details", requireAuth, userController.userDetailsGet);
userRouter.get("/profile/settings", requireAuth, userController.userSettingsGet);

export default userRouter;