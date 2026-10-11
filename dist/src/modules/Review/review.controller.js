import httpStatus from 'http-status';
import { catchAsync } from "../../utils/catchAsync";
import { reviewService } from "./review.service";
import { sendResponse } from "../../utils/sendResponse";
const createReview = catchAsync(async (req, res, next) => {
    const customerId = req.user?.id;
    const payload = req.body;
    const result = await reviewService.createReview(customerId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Review submitted successfully",
        data: result
    });
});
const getReviewsForTechnician = catchAsync(async (req, res) => {
    const { technicianId } = req.params;
    if (!technicianId) {
        throw new Error("Technician ID parameter is required");
    }
    const result = await reviewService.getReviewsForTechnician(technicianId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Technician reviews fetched successfully",
        data: result
    });
});
export const reviewController = {
    createReview,
    getReviewsForTechnician
};
//# sourceMappingURL=review.controller.js.map