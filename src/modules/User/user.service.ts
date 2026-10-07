import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { ICreateUser } from "./user.interface";

const createUser = async (payload: ICreateUser) => {
    const { name, email, password, phone, role } = payload
    const isUserExists = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (isUserExists) {
        throw new Error("User Already Exists")
    };
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
            phone
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            createdAt: true
        }
    });
    return createdUser
};

export const userService = {
    createUser
}