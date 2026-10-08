import httpStatus from 'http-status';
import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { sendResponse } from "../../utils/sendResponse";
import { jwtUtils } from '../../utils/jwt';
import config from '../../config';
import { Role } from '../../../generated/prisma/enums';
import { catchAsync } from '../../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';

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

const auth = (...requiredRoles: Role[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.cookies.accessToken
            //|| req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;

            if (!token) {
                throw new Error("You are not logged in. Please log in to acces this resource")
            }
            const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);
            if (!verifiedToken.success) {
                throw new Error(verifiedToken.error)
            }
            const { id, name, email, role } = verifiedToken.data as JwtPayload;
            if (requiredRoles.length && !requiredRoles.includes(role)) {
                throw new Error("Forbidden, You Don't have permission to access this resource")
            }
            const user = await prisma.user.findUnique({
                where: {
                    userId:id,
                    email,
                    name,
                    role
                }
            })
            if (!user) {
                throw new Error("User not found. Please log in again");
            }
            if (user.status === "BANNED") {
                throw new Error("Your account has been banned. Please contact support")
            }
            req.user = {
                id,
                name,
                email,
                role
            }
            next();
        }
    )
}

router.get('/profile', auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN), userController.getUserProfile);

export const userRoutes = router;