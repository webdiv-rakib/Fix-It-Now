import { BookingStatus } from "../../../generated/prisma/enums";
import { ICreateBooking } from "./booking.interface";
declare const createBooking: (customerId: string, payload: ICreateBooking) => Promise<{
    service: {
        name: string;
        price: number;
    };
    technician: {
        user: {
            email: string;
            name: string;
        };
    } & {
        technicianId: string;
        bio: string | null;
        experienceYears: number;
        rating: number;
        availableSlots: string[];
        location: string | null;
        skills: string[];
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    bookingId: string;
    customerId: string;
    serviceId: string;
    technicianId: string;
    scheduleDate: Date;
    status: BookingStatus;
    totalAmount: number;
    serviceAddress: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getAllServices: (customerId: string, filter?: {
    status?: BookingStatus;
}) => Promise<({
    service: {
        category: {
            name: string;
        };
        description: string;
        name: string;
        price: number;
        serviceId: string;
    };
    technician: {
        user: {
            email: string;
            name: string;
            phone: string;
        };
    } & {
        technicianId: string;
        bio: string | null;
        experienceYears: number;
        rating: number;
        availableSlots: string[];
        location: string | null;
        skills: string[];
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    };
} & {
    bookingId: string;
    customerId: string;
    serviceId: string;
    technicianId: string;
    scheduleDate: Date;
    status: BookingStatus;
    totalAmount: number;
    serviceAddress: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const getTechnicianProfileByUserId: (userId: string) => Promise<{
    technicianId: string;
    bio: string | null;
    experienceYears: number;
    rating: number;
    availableSlots: string[];
    location: string | null;
    skills: string[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getTechnicianBookings: (userId: string, filter?: {
    status?: BookingStatus;
}) => Promise<({
    customer: {
        address: string | null;
        email: string;
        name: string;
        phone: string;
        userId: string;
    };
    service: {
        name: string;
        price: number;
        serviceId: string;
    };
} & {
    bookingId: string;
    customerId: string;
    serviceId: string;
    technicianId: string;
    scheduleDate: Date;
    status: BookingStatus;
    totalAmount: number;
    serviceAddress: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const updateBookingStatus: (userId: string, bookingId: string, newStatus: BookingStatus) => Promise<{
    customer: {
        email: string;
        name: string;
        phone: string;
        userId: string;
    };
    service: {
        name: string;
        price: number;
    };
} & {
    bookingId: string;
    customerId: string;
    serviceId: string;
    technicianId: string;
    scheduleDate: Date;
    status: BookingStatus;
    totalAmount: number;
    serviceAddress: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const cancelCustomerBooking: (customerId: string, bookingId: string) => Promise<{
    service: {
        name: string;
        price: number;
    };
} & {
    bookingId: string;
    customerId: string;
    serviceId: string;
    technicianId: string;
    scheduleDate: Date;
    status: BookingStatus;
    totalAmount: number;
    serviceAddress: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getBookingById: (userId: string, bookingId: string) => Promise<{
    service: {
        category: {
            categoryId: string;
            name: string;
        };
    } & {
        serviceId: string;
        name: string;
        description: string;
        price: number;
        categoryId: string;
        technicianId: string;
    };
} & {
    bookingId: string;
    customerId: string;
    serviceId: string;
    technicianId: string;
    scheduleDate: Date;
    status: BookingStatus;
    totalAmount: number;
    serviceAddress: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const bookingService: {
    createBooking: typeof createBooking;
    getAllServices: typeof getAllServices;
    getTechnicianProfileByUserId: typeof getTechnicianProfileByUserId;
    getTechnicianBookings: typeof getTechnicianBookings;
    updateBookingStatus: typeof updateBookingStatus;
    cancelCustomerBooking: typeof cancelCustomerBooking;
    getBookingById: typeof getBookingById;
};
export {};
//# sourceMappingURL=booking.service.d.ts.map