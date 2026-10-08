import { Router } from "express";
import { auth } from "../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";

const router = Router();

router.get('/users', auth(Role.ADMIN), adminController.getAllUsers);
router.patch('/users/:userId', auth(Role.ADMIN), adminController.userStatusUpdate);
export const adminRoutes = router;