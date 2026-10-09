import { prisma } from "../../lib/prisma";
import { ICreateBooking } from "./booking.interface";

const createBooking = async (customerId: string, payload: ICreateBooking) => {
    const service = await prisma.service.findUnique({
        where: {
            serviceId: payload.serviceId
        }
    });
    if (!service) {
        throw new Error("Service not found")
    };
    const booking = await prisma.booking.create({
        data: {
            customerId,
            serviceId: payload.serviceId,
            technicianId: service.technicianId,
            totalAmount: service.price,
            scheduleDate: new Date(payload.scheduleDate),
            serviceAddress: payload.serviceAddress,
            notes: payload.notes
        },
        include: {
            service: {
                select: {
                    name: true,
                    price: true
                }
            },
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
        }
    })
    return booking
};


export const bookingService = {
    createBooking
}
