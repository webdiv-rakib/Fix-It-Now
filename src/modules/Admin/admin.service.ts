import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateCategory } from "./admin.interface";

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

const allCategories = async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc'
        },
        select: {
            categoryId: true,
            name: true,
            description: true,
        }
    });
    return categories
};

const createCategory = async (payload: ICreateCategory) => {
    const { name, description } = payload;
    const category = await prisma.category.create({
        data: {
            name,
            description
        }
    });
    return category
};

export const adminService = {
    getAllUsers,
    userStatusUpdate,
    allCategories,
    createCategory
}