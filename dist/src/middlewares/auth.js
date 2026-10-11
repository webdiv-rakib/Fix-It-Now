import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";
export const auth = (...requiredRoles) => {
    return catchAsync(async (req, res, next) => {
        const token = req.cookies.accessToken ?
            req.cookies.accessToken
            :
                req.headers.authorization?.startsWith("Bearer ") ?
                    req.headers.authorization?.split(" ")[1]
                    : req.headers.authorization;
        if (!token) {
            throw new Error("You are not logged in. Please log in to acces this resource");
        }
        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);
        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }
        const { id, name, email, role } = verifiedToken.data;
        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("Forbidden, You Don't have permission to access this resource");
        }
        const user = await prisma.user.findUnique({
            where: {
                userId: id,
                email,
                name,
                role
            }
        });
        if (!user) {
            throw new Error("User not found. Please log in again");
        }
        if (user.status === "BANNED") {
            throw new Error("Your account has been banned. Please contact support");
        }
        req.user = {
            id,
            name,
            email,
            role
        };
        next();
    });
};
//# sourceMappingURL=auth.js.map