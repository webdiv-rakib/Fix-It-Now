import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";

const getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const users = await adminService.getAllUsers();
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All users retrieved successfully",
            data: users
        });
    }
);

const userStatusUpdate = catchAsync(
    async (req, res, next) => {
        const { userId } = req.params;
        const { status } = req.body;
        const adminId = (req.user?.id) as string;
        if (userId === adminId) {
            throw new Error("Action denied: You cannot change your own status.");
        }
        const updateStatus = await adminService.userStatusUpdate(userId as string, status)
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Status Updated Successfully",
            data: updateStatus
        })
    }
);

export const adminController = {
    getAllUsers,
    userStatusUpdate
}