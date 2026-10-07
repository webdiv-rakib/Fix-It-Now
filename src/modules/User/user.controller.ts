import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';

const createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body
        const result = await userService.createUser(payload);
        res.status(httpStatus.OK).json({
            message: "User Registered Successfully",
            data: result
        })
    }
)


export const userController = {
    createUser
}