import { Router } from "express";
import * as UserController from './user.controller.js';
import auth from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/errorHandiling.js";
const router = Router();

router.get('/profile',auth,asyncHandler(UserController.profile))

export default router;