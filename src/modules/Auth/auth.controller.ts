import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

const loginUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body
        const login = await authService.loginUser(payload);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged in Successfully",
            data: login
        })
    }
);

export const authController = {
    loginUser
}