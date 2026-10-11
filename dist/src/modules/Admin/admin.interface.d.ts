import { BookingStatus } from "../../../generated/prisma/enums";
export interface ICreateCategory {
    name: string;
    description?: string;
}
export interface IAdminBookingQuery {
    status?: BookingStatus;
    page?: number;
    limit?: number;
}
//# sourceMappingURL=admin.interface.d.ts.map