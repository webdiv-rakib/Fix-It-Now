import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateReview } from "./review.interface"

const createReview = async (customerId: string, payload: ICreateReview) => {
    const { bookingId, rating, comment } = payload;

    if (!rating || rating < 1 || rating > 5) {
        throw new Error("Rating must be 1-5")
    }
    const booking = await prisma.booking.findUnique({
        where: {
            bookingId
        },
        include: {
            review: true
        }
    });
    if (!booking) {
        throw new Error("Booking not found");
    };
    if (booking.customerId !== customerId) {
        throw new Error("Unauthorized: You can only review your own bookings");
    };
    if (booking.status !== BookingStatus.COMPLETED) {
        throw new Error(
            `You can only review a booking after it is COMPLETED (current status: ${booking.status})`
        );
    };
    if (booking.review) {
        throw new Error("You have already submitted a review for this booking");
    }
    const review = await prisma.review.create({
        data: {
            bookingId,
            customerId,
            technicianId: booking.technicianId,
            rating,
            comment
        },
        include: {
            customer: {
                select: {
                    userId: true,
                    name: true
                }
            },
            technician: {
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });
    return review;
}


export const reviewService = {
    createReview
}