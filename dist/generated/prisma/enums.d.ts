export declare const Role: {
    readonly ADMIN: 'ADMIN';
    readonly TECHNICIAN: 'TECHNICIAN';
    readonly CUSTOMER: 'CUSTOMER';
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly ACTIVE: 'ACTIVE';
    readonly BANNED: 'BANNED';
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const BookingStatus: {
    readonly PENDING: 'PENDING';
    readonly ACCEPTED: 'ACCEPTED';
    readonly IN_PROGRESS: 'IN_PROGRESS';
    readonly COMPLETED: 'COMPLETED';
    readonly CANCELLED: 'CANCELLED';
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const PaymentStatus: {
    readonly PENDING: 'PENDING';
    readonly COMPLETED: 'COMPLETED';
    readonly FAILED: 'FAILED';
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
//# sourceMappingURL=enums.d.ts.map