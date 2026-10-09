import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";

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

export const bookingController = {
    createBooking
}