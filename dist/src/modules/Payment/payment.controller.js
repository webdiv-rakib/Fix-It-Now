import httpStatus from 'http-status';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from './payment.service';
const createPaymentSession = catchAsync(async (req, res) => {
    const customerId = req.user?.id;
    const { bookingId } = req.body;
    const result = await paymentService.createPaymentSession(customerId, bookingId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payment session created successfully",
        data: result
    });
});
const confirmPayment = catchAsync(async (req, res) => {
    const { sessionId } = req.body;
    const result = await paymentService.confirmPayment(sessionId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payment confirmed successfully",
        data: result
    });
});
const getCustomerPayments = catchAsync(async (req, res) => {
    const customerId = req.user?.id;
    const result = await paymentService.getCustomerPayments(customerId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Customer payments retrieved successfully",
        data: result
    });
});
const getPaymentById = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const userRole = req.user?.role;
    const { id } = req.params;
    if (!id) {
        throw new Error("Payment ID parameter is required");
    }
    const result = await paymentService.getPaymentById(userId, userRole, id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payment details fetched successfully",
        data: result
    });
});
export const paymentController = {
    createPaymentSession,
    confirmPayment,
    getCustomerPayments,
    getPaymentById
};
//# sourceMappingURL=payment.controller.js.map