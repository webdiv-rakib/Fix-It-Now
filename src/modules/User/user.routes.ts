import { Router } from "express";
import { userController } from "./user.controller";
import { Role } from '../../../generated/prisma/enums'; import { auth } from '../middlewares/auth';

const router = Router();

router.post('/registration', userController.createUser);
router.get('/profile', auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN), userController.getUserProfile);
router.patch('/update', auth(Role.CUSTOMER), userController.updateUserProfile);

export const userRoutes = router;