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

const getAllServices = catchAsync(async (req: Request, res: Response) => {
    const filters = {
        type: req.query.type as string,
        location: req.query.location as string,
        rating: req.query.rating ? Number(req.query.rating) : undefined
    };

    const services = await serviceService.getAllServices(filters);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Services fetched successfully",
        data: services
    });
});

const getAllTechnicians = catchAsync(async (req: Request, res: Response) => {
    const filters = {
        skills: req.query.skills as string,
        location: req.query.location as string,
        rating: req.query.rating ? Number(req.query.rating) : undefined
    };

    const result = await serviceService.getAllTechnicians(filters);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Technicians fetched successfully",
        data: result
    });
});

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await serviceService.getServiceById(id as string);

  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Service not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service fetched successfully",
    data: result,
  });
});

export const serviceController = {
    createService,
    getAllServices,
    getAllTechnicians,
    getServiceById
}