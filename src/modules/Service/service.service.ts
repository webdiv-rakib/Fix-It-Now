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


export const serviceService = {
    createService
}