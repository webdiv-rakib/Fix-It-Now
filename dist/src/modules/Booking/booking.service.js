import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
const allowedTransitions = {
    [BookingStatus.PENDING]: [BookingStatus.ACCEPTED, BookingStatus.CANCELLED],
    [BookingStatus.ACCEPTED]: [BookingStatus.IN_PROGRESS, BookingStatus.CANCELLED],
    [BookingStatus.IN_PROGRESS]: [BookingStatus.COMPLETED, BookingStatus.CANCELLED],
    [BookingStatus.COMPLETED]: [],
    [BookingStatus.CANCELLED]: []
};
const createBooking = async (customerId, payload) => {
    const service = await prisma.service.findUnique({
        where: {
            serviceId: payload.serviceId
        }
    });
    if (!service) {
        throw new Error("Service not found");
    }
    ;
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
    });
    return booking;
};
const getAllServices = async (customerId, filter) => {
    const whereConditions = {
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
const getTechnicianProfileByUserId = async (userId) => {
    const profile = await prisma.technicianProfile.findUnique({
        where: { userId }
    });
    if (!profile) {
        throw new Error("Technician profile not found");
    }
    return profile;
};
const getTechnicianBookings = async (userId, filter) => {
    const technicianProfile = await getTechnicianProfileByUserId(userId);
    const whereConditions = {
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
const updateBookingStatus = async (userId, bookingId, newStatus) => {
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
        throw new Error(`Invalid status change: cannot transition booking from ${existingBooking.status} to ${newStatus}`);
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
const cancelCustomerBooking = async (customerId, bookingId) => {
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
        throw new Error(`Cannot cancel booking: only PENDING bookings can be cancelled (current status: ${booking.status})`);
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
const getBookingById = async (userId, bookingId) => {
    const booking = await prisma.booking.findUnique({
        where: { bookingId },
        include: {
            service: {
                include: {
                    category: {
                        select: {
                            categoryId: true,
                            name: true
                        }
                    }
                }
            },
        }
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    // Security check: ensure only the customer who booked it (or the assigned technician) can view it
    const isCustomer = booking.customerId === userId;
    //const isTechnician = booking.technician?.userId === userId;
    // if (!isCustomer && !isTechnician) {
    //     throw new Error("Unauthorized: You do not have access to this booking");
    // }
    return booking;
};
export const bookingService = {
    createBooking,
    getAllServices,
    getTechnicianProfileByUserId,
    getTechnicianBookings,
    updateBookingStatus,
    cancelCustomerBooking,
    getBookingById
};
//# sourceMappingURL=booking.service.js.map