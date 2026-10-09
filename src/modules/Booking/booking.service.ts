import { BookingStatus } from "../../../generated/prisma/enums";
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

const getCustomerBookings = async (customerId: string, filter?: { status?: BookingStatus }) => {
    const whereConditions: { customerId: string; status?: BookingStatus } = {
        customerId,
    };
    if (filter?.status) {
        whereConditions.status = filter.status;
    }
    const bookings = await prisma.booking.findMany({
        where: whereConditions,
        include: {
            service: {
                select: {
                    serviceId: true,
                    name: true,
                    description: true,
                    price: true,
                    category: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            technician: {
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            phone: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return bookings;
};

const getTechnicianProfileByUserId = async (userId: string) => {
    const profile = await prisma.technicianProfile.findUnique({
        where: { userId }
    });
    if (!profile) {
        throw new Error("Technician profile not found");
    }
    return profile;
};

const getTechnicianBookings = async (
    userId: string,
    filter?: { status?: BookingStatus }
) => {
    const technicianProfile = await getTechnicianProfileByUserId(userId);

    const whereConditions: { technicianId: string; status?: BookingStatus } = {
        technicianId: technicianProfile.technicianId
    };

    if (filter?.status) {
        whereConditions.status = filter.status;
    }

    const bookings = await prisma.booking.findMany({
        where: whereConditions,
        include: {
            customer: {
                select: {
                    userId: true,
                    name: true,
                    email: true,
                    phone: true,
                    address: true
                }
            },
            service: {
                select: {
                    serviceId: true,
                    name: true,
                    price: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return bookings;
};

export const bookingService = {
    createBooking,
    getCustomerBookings,
    getTechnicianProfileByUserId,
    getTechnicianBookings,
}
