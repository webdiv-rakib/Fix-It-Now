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

export const adminController = {
    getAllUsers
}