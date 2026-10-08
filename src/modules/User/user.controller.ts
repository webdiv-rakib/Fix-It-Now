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
    async (req: Request, res: Response, next: NextFunction) => {
        // const cookies = req.cookies
        // const { accessToken } = req.cookies;
        // console.log(req.user, "user request");
        // const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);
        // if (typeof verifiedToken === "string") {
        //     throw new Error(verifiedToken)
        // }
        const profile = await userService.getUserProfile(req.user?.id as string);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User fetched Successfully",
            data: { profile }
        })
    }
);



export const userController = {
    createUser,
    getUserProfile
}