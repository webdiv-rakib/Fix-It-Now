import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body
        const userData = await userService.createUser(payload);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User Registered Successfully",
            data: { userData }
        })
    }
);


export const userController = {
    createUser
}