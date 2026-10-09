import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import { BookingStatus } from '../../../generated/prisma/enums';

const createBooking = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const customerId = req.user?.id as string
        const payload = req.body;
        const result = await bookingService.createBooking(customerId, payload);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Booking request created successfully",
            data: result
        });

    }
);

const getCustomerBookings = catchAsync(
    async (req, res, next) => {
        const customerId = req.user?.id as string;
        const { status } = req.query;
        const bookings = await bookingService.getCustomerBookings(customerId, { status: status as BookingStatus });
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Customer bookings fetched successfully",
            data: bookings,
        });
    }
);

export const bookingController = {
    createBooking,
    getCustomerBookings
}