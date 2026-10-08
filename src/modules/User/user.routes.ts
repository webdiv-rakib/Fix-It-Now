import httpStatus from 'http-status';
import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { sendResponse } from "../../utils/sendResponse";
import { jwtUtils } from '../../utils/jwt';
import config from '../../config';
import { Role } from '../../../generated/prisma/enums';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                name: string,
                email: string,
                role: Role
            }
        }
    }
}
const router = Router();
router.post('/registration', userController.createUser);
router.get('/profile', (req: Request, res: Response, next: NextFunction) => {
    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "User Profile Retrieved Successfully",
    //     data: null
    // })
    console.log(req.cookies);
    const { accessToken } = req.cookies
    const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);
    if (typeof verifiedToken === "string") {
        throw new Error(verifiedToken)
    }
    const { id, name, email, role } = verifiedToken;
    const requiredRoles = [Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN];
    //auth guard
    if (!requiredRoles.includes(role)) {
        return res.status(403).json({
            success: true,
            statusCode: httpStatus.FORBIDDEN,
            message: "Forbidden, You Don't have permission to access this resource"
        })
    }
    req.user = {
        id,
        name,
        email,
        role
    }
    next();
}, userController.getUserProfile);

export const userRoutes = router;