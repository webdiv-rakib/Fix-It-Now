import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Booking: 'Booking';
    readonly Category: 'Category';
    readonly Payment: 'Payment';
    readonly Review: 'Review';
    readonly Service: 'Service';
    readonly TechnicianProfile: 'TechnicianProfile';
    readonly User: 'User';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const BookingScalarFieldEnum: {
    readonly bookingId: 'bookingId';
    readonly customerId: 'customerId';
    readonly serviceId: 'serviceId';
    readonly technicianId: 'technicianId';
    readonly scheduleDate: 'scheduleDate';
    readonly status: 'status';
    readonly totalAmount: 'totalAmount';
    readonly serviceAddress: 'serviceAddress';
    readonly notes: 'notes';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly categoryId: 'categoryId';
    readonly name: 'name';
    readonly description: 'description';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly paymentId: 'paymentId';
    readonly bookingId: 'bookingId';
    readonly customerId: 'customerId';
    readonly amount: 'amount';
    readonly transactionId: 'transactionId';
    readonly provider: 'provider';
    readonly status: 'status';
    readonly paidAt: 'paidAt';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly reviewId: 'reviewId';
    readonly bookingId: 'bookingId';
    readonly customerId: 'customerId';
    readonly technicianId: 'technicianId';
    readonly rating: 'rating';
    readonly comment: 'comment';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const ServiceScalarFieldEnum: {
    readonly serviceId: 'serviceId';
    readonly name: 'name';
    readonly description: 'description';
    readonly price: 'price';
    readonly categoryId: 'categoryId';
    readonly technicianId: 'technicianId';
};
export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum];
export declare const TechnicianProfileScalarFieldEnum: {
    readonly technicianId: 'technicianId';
    readonly bio: 'bio';
    readonly experienceYears: 'experienceYears';
    readonly rating: 'rating';
    readonly availableSlots: 'availableSlots';
    readonly location: 'location';
    readonly skills: 'skills';
    readonly userId: 'userId';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type TechnicianProfileScalarFieldEnum = (typeof TechnicianProfileScalarFieldEnum)[keyof typeof TechnicianProfileScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly userId: 'userId';
    readonly name: 'name';
    readonly email: 'email';
    readonly password: 'password';
    readonly role: 'role';
    readonly phone: 'phone';
    readonly address: 'address';
    readonly status: 'status';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map