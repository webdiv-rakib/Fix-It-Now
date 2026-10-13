import { BookingStatus, PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

const createPaymentSession = async (customerId: string, bookingId: string) => {
    const booking = await prisma.booking.findUnique({
        where: { bookingId },
        include: {
            service: true,
            payment: true
        }
    });

    if (!booking) {
        throw new Error("Booking not found");
    }

    if (booking.customerId !== customerId) {
        throw new Error("Unauthorized: You do not own this booking");
    }

    if (booking.status !== BookingStatus.ACCEPTED) {
        throw new Error(`Payment can only be made for ACCEPTED bookings (current: ${booking.status})`);
    }

    if (booking.payment && booking.payment.status === PaymentStatus.COMPLETED) {
        throw new Error("This booking has already been paid for");
    }

    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

    // stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: (await prisma.user.findUnique({ where: { userId: customerId } }))?.email,
        line_items: [
            {
                price_data: {
                    currency: "bdt",
                    product_data: {
                        name: booking.service.name,
                        description: booking.service.description || "Fix-It-Now Service"
                    },
                    unit_amount: Math.round(booking.totalAmount * 100) // Stripe expects cents
                },
                quantity: 1
            }
        ],
        success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&bookingId=${bookingId}`,
        cancel_url: `${clientUrl}/payment/cancel?bookingId=${bookingId}`,
        metadata: {
            bookingId,
            customerId
        }
    });

    // update pending payment record
    await prisma.payment.upsert({
        where: { bookingId },
        update: {
            transactionId: session.id,
            amount: booking.totalAmount,
            status: PaymentStatus.PENDING
        },
        create: {
            bookingId,
            customerId,
            amount: booking.totalAmount,
            transactionId: session.id,
            provider: "STRIPE",
            status: PaymentStatus.PENDING
        }
    });

    return {
        paymentUrl: session.url,
        sessionId: session.id
    };
};

const confirmPayment = async (sessionId: string) => {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
        throw new Error("Payment was not completed");
    }

    const bookingId = session.metadata?.bookingId;
    if (!bookingId) {
        throw new Error("Missing booking metadata on Stripe session");
    }

    const updatedPayment = await prisma.$transaction(async (tx) => {
        const payment = await tx.payment.update({
            where: { bookingId },
            data: {
                status: PaymentStatus.COMPLETED,
                paidAt: new Date()
            }
        });
        await tx.booking.update({
            where: { bookingId },
            data: {
                status: BookingStatus.IN_PROGRESS
            }
        });

        return payment;
    });

    return updatedPayment;
};

const getCustomerPayments = async (customerId: string) => {
    return prisma.payment.findMany({
        where: { customerId },
        include: {
            booking: {
                include: {
                    service: {
                        select: { name: true, price: true }
                    }
                }
            }
        },
        orderBy: { createdAt: "desc" }
    });
};

const getPaymentById = async (userId: string, userRole: string, paymentId: string) => {
    const payment = await prisma.payment.findUnique({
        where: { paymentId },
        include: {
            customer: {
                select: {
                    userId: true,
                    name: true,
                    email: true,
                    phone: true
                }
            },
            booking: {
                include: {
                    service: {
                        select: {
                            serviceId: true,
                            name: true,
                            price: true
                        }
                    },
                    technician: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    email: true,
                                    phone: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    if (!payment) {
        throw new Error("Payment record not found");
    }

    // Authorization check: allow only the payer, the assigned technician, or an Admin
    const isOwner = payment.customerId === userId;
    const isAssignedTechnician = payment.booking?.technician?.userId === userId;
    const isAdmin = userRole === "ADMIN";

    if (!isOwner && !isAssignedTechnician && !isAdmin) {
        throw new Error("Unauthorized: You do not have access to this payment detail");
    }

    return payment;
};

export const paymentService = {
    createPaymentSession,
    confirmPayment,
    getCustomerPayments,
    getPaymentById
}