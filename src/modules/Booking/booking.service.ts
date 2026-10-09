import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateBooking } from "./booking.interface";

const allowedTransitions: Record<BookingStatus, BookingStatus[]> = {
    [BookingStatus.PENDING]: [BookingStatus.ACCEPTED, BookingStatus.CANCELLED],
    [BookingStatus.ACCEPTED]: [BookingStatus.IN_PROGRESS, BookingStatus.CANCELLED],
    [BookingStatus.IN_PROGRESS]: [BookingStatus.COMPLETED, BookingStatus.CANCELLED],
    [BookingStatus.COMPLETED]: [],
    [BookingStatus.CANCELLED]: []
};

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

const updateBookingStatus = async (
    userId: string,
    bookingId: string,
    newStatus: BookingStatus
) => {

    const technicianProfile = await prisma.technicianProfile.findUnique({
        where: { userId }
    });

    if (!technicianProfile) {
        throw new Error("Technician profile not found");
    }


    const existingBooking = await prisma.booking.findUnique({
        where: { bookingId }
    });

    if (!existingBooking) {
        throw new Error("Booking not found");
    }


    if (existingBooking.technicianId !== technicianProfile.technicianId) {
        throw new Error("Unauthorized: You are not assigned to this booking");
    }


    const validNextStates = allowedTransitions[existingBooking.status];
    if (!validNextStates.includes(newStatus)) {
        throw new Error(
            `Invalid status change: cannot transition booking from ${existingBooking.status} to ${newStatus}`
        );
    }


    const updatedBooking = await prisma.booking.update({
        where: { bookingId },
        data: { status: newStatus },
        include: {
            customer: {
                select: {
                    userId: true,
                    name: true,
                    email: true,
                    phone: true
                }
            },
            service: {
                select: {
                    name: true,
                    price: true
                }
            }
        }
    });

    return updatedBooking;
};

const cancelCustomerBooking = async (customerId: string, bookingId: string) => {
    const booking = await prisma.booking.findUnique({
        where: { bookingId }
    });

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (booking.customerId !== customerId) {
        throw new Error("Unauthorized: You do not own this booking");
    }

    if (booking.status !== BookingStatus.PENDING) {
        throw new Error(
            `Cannot cancel booking: only PENDING bookings can be cancelled (current status: ${booking.status})`
        );
    }

    const cancelledBooking = await prisma.booking.update({
        where: { bookingId },
        data: {
            status: BookingStatus.CANCELLED
        },
        include: {
            service: {
                select: {
                    name: true,
                    price: true
                }
            }
        }
    });

    return cancelledBooking;
};

export const bookingService = {
    createBooking,
    getCustomerBookings,
    getTechnicianProfileByUserId,
    getTechnicianBookings,
    updateBookingStatus,
    cancelCustomerBooking
}
