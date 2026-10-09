import { Router } from "express";
import { serviceController } from "./service.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post('/create-service', auth(Role.TECHNICIAN), serviceController.createService);

export const serviceRoutes = router;