import httpStatus from 'http-status';
import { catchAsync } from "../../utils/catchAsync";
import { serviceService } from "./service.service";
import { sendResponse } from "../../utils/sendResponse";
const createService = catchAsync(async (req, res, next) => {
    const userId = req.user?.id;
    const payload = req.body;
    const newService = await serviceService.createService(userId, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Service Created Successfully",
        data: newService
    });
});
const getAllServices = catchAsync(async (req, res) => {
    const filters = {
        type: req.query.type,
        location: req.query.location,
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
const getAllTechnicians = catchAsync(async (req, res) => {
    const filters = {
        skills: req.query.skills,
        location: req.query.location,
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
export const serviceController = {
    createService,
    getAllServices,
    getAllTechnicians
};
//# sourceMappingURL=service.controller.js.map