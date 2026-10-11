import httpStatus from 'http-status';
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await adminService.getAllUsers();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All users retrieved successfully",
        data: users
    });
});
const userStatusUpdate = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const { status } = req.body;
    const adminId = (req.user?.id);
    if (userId === adminId) {
        throw new Error("Action denied: You cannot change your own status.");
    }
    const updateStatus = await adminService.userStatusUpdate(userId, status);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Status Updated Successfully",
        data: updateStatus
    });
});
const allCategories = catchAsync(async (req, res, next) => {
    const categories = await adminService.allCategories();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Category Feteched Successfully",
        data: categories
    });
});
const createCategory = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const category = await adminService.createCategory(payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category Created Successfully",
        data: category
    });
});
const getAllBookings = catchAsync(async (req, res) => {
    const query = {
        status: req.query.status,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10
    };
    const result = await adminService.getAllBookingsForAdmin(query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All platform bookings fetched successfully",
        meta: result.meta,
        data: result.data
    });
});
export const adminController = {
    getAllUsers,
    userStatusUpdate,
    allCategories,
    createCategory,
    getAllBookings
};
//# sourceMappingURL=admin.controller.js.map