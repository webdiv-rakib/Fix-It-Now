import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILogin } from "./auth.interface";
import { SignOptions } from "jsonwebtoken"
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const loginUser = async (payload: ILogin) => {
    const { email, password } = payload;
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        },
    })
    if (user.status === "BANNED") {
        throw new Error("Your account has been banned. Please contact support")
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Password Incorrect.Please insert correct password")
    };

    const jwtPayload = {
        id: user.userId,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in as SignOptions);
    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in as SignOptions);

    return {
        accessToken,
        refreshToken
    }
};


export const authService = {
    loginUser
}