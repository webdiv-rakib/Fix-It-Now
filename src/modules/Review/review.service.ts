import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICreateReview } from "./review.interface"

const createReview = async (customerId: string, payload: ICreateReview) => {
    const { bookingId, rating, comment } = payload;

    // 1. Validate rating range
    if (!rating || rating < 1 || rating > 5) {
        throw new Error("Rating must be an integer between 1 and 5");
    }

    // 2. Look up the booking
    const booking = await prisma.booking.findUnique({
        where: { bookingId },
        include: {
            review: true,
            technician: true
        }
    });

    if (!booking) {
        throw new Error("Booking not found");
    }

    // 3. Authorization & Status checks
    if (booking.customerId !== customerId) {
        throw new Error("Unauthorized: You can only review your own bookings");
    }

    if (booking.status !== BookingStatus.COMPLETED) {
        throw new Error(
            `You can only review a booking after it is COMPLETED (current status: ${booking.status})`
        );
    }

    if (booking.review) {
        throw new Error("You have already submitted a review for this booking");
    }

    const targetTechnicianId = booking.technician.technicianId;

    // 4. Run creation and rating update in a transaction
    const result = await prisma.$transaction(async (tx) => {
        // A. Create the review
        const newReview = await tx.review.create({
            data: {
                bookingId,
                customerId,
                technicianId: targetTechnicianId,
                rating,
                comment
            },
            include: {
                customer: {
                    select: {
                        userId: true,
                        name: true
                    }
                }
            }
        });

        // B. Calculate the new aggregate average rating
        const aggregate = await tx.review.aggregate({
            where: {
                technicianId: targetTechnicianId
            },
            _avg: {
                rating: true
            },
            _count: {
                reviewId: true
            }
        });

        const newAverageRating = aggregate._avg.rating
            ? Number(aggregate._avg.rating.toFixed(1))
            : 0;

        // C. Update the technician profile
        await tx.technicianProfile.update({
            where: {
                technicianId: targetTechnicianId
            },
            data: {
                rating: newAverageRating
            }
        });

        return newReview;
    });

    return result;
};

const getReviewsForTechnician = async (technicianId: string) => {
    const reviews = await prisma.review.findMany({
        where: { technicianId },
        include: {
            customer: {
                select: {
                    userId: true,
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    // Calculate average rating
    const totalReviews = reviews.length;
    const averageRating =
        totalReviews > 0
            ? Number(
                (
                    reviews.reduce((acc, curr) => acc + curr.rating, 0) /
                    totalReviews
                ).toFixed(1)
            )
            : 0;

    return {
        technicianId,
        averageRating,
        totalReviews,
        reviews
    };
};

export const reviewService = {
    createReview,
    getReviewsForTechnician
}