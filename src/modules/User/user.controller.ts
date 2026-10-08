import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { jwtUtils } from '../../utils/jwt';
import config from '../../config';

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

const getUserProfile = catchAsync(
    async (req, res, next) => {
        const { accessToken } = req.cookies;
        const verifyToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);
        if (typeof verifyToken === "string") {
            throw new Error(verifyToken)
        };
        const profile = await userService.getUserProfile(verifyToken.id);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User profile retrived successfully",
            data: { profile }
        })
    }
);


export const userController = {
    createUser,
    getUserProfile
}