import { Request, Response } from "express";
export declare const paymentController: {
    createPaymentSession: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    confirmPayment: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getCustomerPayments: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getPaymentById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=payment.controller.d.ts.map