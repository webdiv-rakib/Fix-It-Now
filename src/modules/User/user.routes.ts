import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.post('/registration', userController.createUser);
router.get('/profile', userController.getUserProfile);

export const userRoutes = router;