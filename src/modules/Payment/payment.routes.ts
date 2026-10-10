import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";

const router = Router();

router.post('/create', auth(Role.CUSTOMER), paymentController.createPaymentSession);
router.post('/confirm', auth(Role.CUSTOMER), paymentController.confirmPayment);
router.get('/', auth(Role.CUSTOMER), paymentController.getCustomerPayments);
router.get("/:id", auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN), paymentController.getPaymentById);
export const paymentRoutes = router;