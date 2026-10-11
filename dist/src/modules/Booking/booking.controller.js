import httpStatus from 'http-status';
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
const createBooking = catchAsync(async (req, res, next) => {
    const customerId = req.user?.id;
    const payload = req.body;
    const result = await bookingService.createBooking(customerId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Booking request created successfully",
        data: result
    });
});
const getAllServices = catchAsync(async (req, res, next) => {
    const customerId = req.user?.id;
    const { status } = req.query;
    const bookings = await bookingService.getAllServices(customerId, { status: status });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Customer bookings fetched successfully",
        data: bookings,
    });
});
const getTechnicianBookings = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const { status } = req.query;
    const bookings = await bookingService.getTechnicianBookings(userId, {
        status: status
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician bookings fetched successfully",
        data: bookings
    });
});
const updateBookingStatus = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const { bookingId } = req.params;
    const { status } = req.body;
    const result = await bookingService.updateBookingStatus(userId, bookingId, status);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking status updated successfully",
        data: result
    });
});
const cancelCustomerBooking = catchAsync(async (req, res) => {
    const customerId = req.user?.id;
    const { bookingId } = req.params;
    if (!bookingId) {
        throw new Error("bookingId parameter is missing from the request URL");
    }
    const result = await bookingService.cancelCustomerBooking(customerId, bookingId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Booking cancelled successfully",
        data: result
    });
});
const getBookingById = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!id) {
        throw new Error("Booking ID parameter is required");
    }
    const result = await bookingService.getBookingById(userId, id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking details fetched successfully",
        data: result
    });
});
export const bookingController = {
    createBooking,
    getAllServices,
    getTechnicianBookings,
    updateBookingStatus,
    cancelCustomerBooking,
    getBookingById
};
//# sourceMappingURL=booking.controller.js.map