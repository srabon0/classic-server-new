import express from "express";

import validateRequest from "../../middlewares/validateRequest";

import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import { userValidation } from "../User/user.validation";
import { UserController } from "../User/user.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.CreateUserValidationSchema),
  UserController.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

export const AuthRoutes = router;
