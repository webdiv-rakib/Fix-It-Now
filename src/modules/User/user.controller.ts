import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
    const payload = req.body
    const result = await userService.createUser(payload)
    res.status(httpStatus.OK).json({
        message: "User Registered Successfully",
        data: result
    })
};

export const userController = {
    createUser
}