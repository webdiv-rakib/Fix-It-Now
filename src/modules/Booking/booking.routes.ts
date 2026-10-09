import { Router } from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.get('/', auth(Role.CUSTOMER), bookingController.getCustomerBookings);
router.post('/create-booking', auth(Role.CUSTOMER), bookingController.createBooking);
router.get('/technician-bookings', auth(Role.TECHNICIAN), bookingController.getTechnicianBookings);

export const bookingRoutes = router;