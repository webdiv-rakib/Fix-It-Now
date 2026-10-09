import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get('/users', auth(Role.ADMIN), adminController.getAllUsers);
router.patch('/users/:userId', auth(Role.ADMIN), adminController.userStatusUpdate);

router.get('/categories', adminController.allCategories);
router.post('/create-categories', auth(Role.ADMIN), adminController.createCategory);
export const adminRoutes = router;