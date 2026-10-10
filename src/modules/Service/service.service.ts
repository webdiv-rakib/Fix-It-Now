import { Prisma } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";
import { ICreateService, IServiceFilters } from "./service.interface";

const createService = async (userId: string, payload: ICreateService) => {
    const technicianProfile = await prisma.technicianProfile.findUnique({
        where: {
            userId
        }
    });
    if (!technicianProfile) {
        throw new Error("Technician profile not found. Please update your profile first.")
    };
    const newService = await prisma.service.create({
        data: {
            name: payload.name,
            description: payload.description,
            price: payload.price,
            categoryId: payload.categoryId,
            technicianId: technicianProfile.technicianId
        }
    })
    return newService
};

const getAllServices = async (filters: IServiceFilters) => {
    const { type, location, rating } = filters;
    const andConditions: Prisma.ServiceWhereInput[] = [];
    if (type) {
        andConditions.push({
            OR: [
                { categoryId: type },
                {
                    category: {
                        name: { contains: type, mode: "insensitive" }
                    }
                }
            ]
        });
    }
    if (location) {
        andConditions.push({
            technician: {
                OR: [
                    {
                        user: {
                            address: { contains: location, mode: "insensitive" }
                        }
                    }
                ]
            }
        });
    }
    if (rating) {
        andConditions.push({
            technician: {
                rating: { gte: Number(rating) }
            }
        });
    }

    const whereConditions: Prisma.ServiceWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const services = await prisma.service.findMany({
        where: whereConditions,
        include: {
            category: {
                select: {
                    categoryId: true,
                    name: true
                }
            },
            technician: {
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            phone: true,
                            address: true
                        }
                    }
                }
            }
        }
    });

    return services;
};


export const serviceService = {
    createService,
    getAllServices
}