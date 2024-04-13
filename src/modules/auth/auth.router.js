import { Router } from "express";
import * as AuthController from './auth.controller.js';
import { asyncHandler } from './../../utils/errorHandiling.js';
import validation from './../../middleware/validation.js';
import { signinSchema, signupSchema } from "./auth.validation.js";
const router = Router();

router.post('/signup',validation(signupSchema),asyncHandler(AuthController.signup));
router.post('/signin',validation(signinSchema),asyncHandler(AuthController.signin));
router.get('/confirmEmail/:token',asyncHandler(AuthController.confirmEmail));

export default router;