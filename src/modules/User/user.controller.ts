import { TechnicianProfile } from './../../../generated/prisma/client';
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

const updateUserProfile = catchAsync(
    async (req, res, next) => {
        const userId = req.user?.id
        if (!userId) {
            throw new Error("User ID not found in token. Please log in again.");
        }
        const payload = req.body;
        const updatedProfile = await userService.updateUserProfile(userId, payload);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User profile updated successfully",
            data: { updatedProfile }
        });
    }
);

const technicianProfileUpdate = catchAsync(
    async (req, res, next) => {
        const userId = req.user?.id as string;
        const payload = req.body;
        const updatedProfile = await userService.technicianProfileUpdate(userId, payload);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Technician profile updated successfully",
            data: updatedProfile
        });
    }
)



export const userController = {
    createUser,
    getUserProfile,
    updateUserProfile,
    technicianProfileUpdate
}