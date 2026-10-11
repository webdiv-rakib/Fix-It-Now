import { UserStatus } from "../../../generated/prisma/enums";
import { IAdminBookingQuery, ICreateCategory } from "./admin.interface";
declare const getAllUsers: () => Promise<{
    userId: string;
    name: string;
    email: string;
    role: import("../../../generated/prisma/enums").Role;
    phone: string;
    address: string | null;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}[]>;
declare const userStatusUpdate: (userId: string, status: UserStatus) => Promise<{
    userId: string;
    name: string;
    email: string;
    role: import("../../../generated/prisma/enums").Role;
    phone: string;
    address: string | null;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const allCategories: () => Promise<{
    categoryId: string;
    description: string | null;
    name: string;
}[]>;
declare const createCategory: (payload: ICreateCategory) => Promise<{
    categoryId: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getAllBookingsForAdmin: (query: IAdminBookingQuery) => Promise<{
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    data: ({
        customer: {
            email: string;
            name: string;
            phone: string;
            userId: string;
        };
    } & {
        bookingId: string;
        customerId: string;
        serviceId: string;
        technicianId: string;
        scheduleDate: Date;
        status: import("../../../generated/prisma/enums").BookingStatus;
        totalAmount: number;
        serviceAddress: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[];
}>;
export declare const adminService: {
    getAllUsers: typeof getAllUsers;
    userStatusUpdate: typeof userStatusUpdate;
    allCategories: typeof allCategories;
    createCategory: typeof createCategory;
    getAllBookingsForAdmin: typeof getAllBookingsForAdmin;
};
export {};
//# sourceMappingURL=admin.service.d.ts.map