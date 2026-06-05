import { Router } from "express";
import { requireAuth } from "modules/auth/auth.middlewares";
import * as userController from './user.controller'

const userRouter = Router();

userRouter.get("/me", requireAuth, userController.loggedUser);
//userRouter.get("/dashboard", requireAuth, userController.dashboardGet);
//userRouter.get("/profile", requireAuth, userController.userProfileGet);
userRouter.post("/profile/details", requireAuth, userController.updateUserDetailsPost);
userRouter.get("/profile/settings", requireAuth, userController.userSettingsGet);
//TODO: Continue here -- test get route of payment-methods/pull
userRouter.get("/profile/settings/payment-methods/pull", requireAuth, userController.userPaymentMethodsGet);
userRouter.post("/profile/settings/payment-methods/update", requireAuth, userController.userPaymentMethodsPost);

export default userRouter;