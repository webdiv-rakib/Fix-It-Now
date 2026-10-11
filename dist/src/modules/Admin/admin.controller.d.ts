import { NextFunction, Request, Response } from "express";
export declare const adminController: {
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userStatusUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    allCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllBookings: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=admin.controller.d.ts.map