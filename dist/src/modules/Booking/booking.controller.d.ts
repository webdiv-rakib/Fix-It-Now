import { NextFunction, Request, Response } from "express";
export declare const bookingController: {
    createBooking: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllServices: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTechnicianBookings: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateBookingStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    cancelCustomerBooking: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getBookingById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=booking.controller.d.ts.map