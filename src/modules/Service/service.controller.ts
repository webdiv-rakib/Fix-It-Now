import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { serviceService } from "./service.service";
import { sendResponse } from "../../utils/sendResponse";

const createService = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id as string;
        const payload = req.body;
        const newService = await serviceService.createService(userId, payload);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "Service Created Successfully",
            data: newService
        });
    }
);

export const serviceController = {
    createService
}