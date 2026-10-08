import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        omit: {
            password: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return users
};

const userStatusUpdate = async (userId: string, status: UserStatus) => {
    const updateStatus = await prisma.user.update({
        where: {
            userId
        },
        data: {
            status
        },
        omit: {
            password: true
        }
    })
    return updateStatus
};

export const adminService = {
    getAllUsers,
    userStatusUpdate,
}