import { ICreateReview } from "./review.interface";
declare const createReview: (customerId: string, payload: ICreateReview) => Promise<{
    customer: {
        name: string;
        userId: string;
    };
} & {
    reviewId: string;
    bookingId: string;
    customerId: string;
    technicianId: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const getReviewsForTechnician: (technicianId: string) => Promise<{
    technicianId: string;
    averageRating: number;
    totalReviews: number;
    reviews: ({
        customer: {
            name: string;
            userId: string;
        };
    } & {
        reviewId: string;
        bookingId: string;
        customerId: string;
        technicianId: string;
        rating: number;
        comment: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[];
}>;
export declare const reviewService: {
    createReview: typeof createReview;
    getReviewsForTechnician: typeof getReviewsForTechnician;
};
export {};
//# sourceMappingURL=review.service.d.ts.map