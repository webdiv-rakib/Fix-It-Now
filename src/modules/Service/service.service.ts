import { prisma } from "../../lib/prisma";
import { ICreateService } from "./service.interface";

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

const getAllServices = async (query: any) => {
    const { searchTerm, categoryId } = query;
    const whereConditions: any = {};
    if (searchTerm) {
        whereConditions.OR = [
            { name: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } }
        ];
    }
    if (categoryId) {
        whereConditions.categoryId = categoryId;
    }
    const services = await prisma.service.findMany({
        where: whereConditions,
        include: {
            // Bring in the category name
            category: {
                select: {
                    name: true
                }
            },
            // Bring in the technician profile AND their actual user name
            technician: {
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            }
        },
    });

    return services;
};


export const serviceService = {
    createService,
    getAllServices
}