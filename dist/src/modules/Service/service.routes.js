import { Router } from "express";
import { serviceController } from "./service.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
router.get('/', serviceController.getAllServices);
router.get('/all-technician', serviceController.getAllTechnicians);
router.post('/create-service', auth(Role.TECHNICIAN), serviceController.createService);
export const serviceRoutes = router;
//# sourceMappingURL=service.routes.js.map