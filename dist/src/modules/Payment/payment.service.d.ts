import { BookingStatus, PaymentStatus } from "../../../generated/prisma/enums";
declare const createPaymentSession: (customerId: string, bookingId: string) => Promise<{
    paymentUrl: string | null;
    sessionId: string;
}>;
declare const confirmPayment: (sessionId: string) => Promise<{
    paymentId: string;
    bookingId: string;
    customerId: string;
    amount: number;
    transactionId: string | null;
    provider: string;
    status: PaymentStatus;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getCustomerPayments: (customerId: string) => Promise<({
    booking: {
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
    };
} & {
    paymentId: string;
    bookingId: string;
    customerId: string;
    amount: number;
    transactionId: string | null;
    provider: string;
    status: PaymentStatus;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
declare const getPaymentById: (userId: string, userRole: string, paymentId: string) => Promise<{
    booking: {
        service: {
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
    };
    customer: {
        email: string;
        name: string;
        phone: string;
        userId: string;
    };
} & {
    paymentId: string;
    bookingId: string;
    customerId: string;
    amount: number;
    transactionId: string | null;
    provider: string;
    status: PaymentStatus;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const paymentService: {
    createPaymentSession: typeof createPaymentSession;
    confirmPayment: typeof confirmPayment;
    getCustomerPayments: typeof getCustomerPayments;
    getPaymentById: typeof getPaymentById;
};
export {};
//# sourceMappingURL=payment.service.d.ts.map