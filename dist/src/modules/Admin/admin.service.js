import { prisma } from "../../lib/prisma";
const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        omit: {
            password: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return users;
};
const userStatusUpdate = async (userId, status) => {
    const updateStatus = await prisma.user.update({
        where: {
            userId
        },
        data: {
            status
        },
        omit: {
            password: true
        }
    });
    return updateStatus;
};
const allCategories = async () => {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc'
        },
        select: {
            categoryId: true,
            name: true,
            description: true,
        }
    });
    return categories;
};
const createCategory = async (payload) => {
    const { name, description } = payload;
    const category = await prisma.category.create({
        data: {
            name,
            description
        }
    });
    return category;
};
const getAllBookingsForAdmin = async (query) => {
    const { status, page = 1, limit = 10 } = query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const whereConditions = {};
    if (status) {
        whereConditions.status = status;
    }
    const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
            where: whereConditions,
            skip,
            take: limitNumber,
            include: {
                customer: {
                    select: {
                        userId: true,
                        name: true,
                        email: true,
                        phone: true
                    }
                },
                // technician: {
                //     include: {
                //         user: {
                //             select: {
                //                 userId: true,
                //                 name: true,
                //                 email: true,
                //                 phone: true
                //             }
                //         }
                //     }
                // },
                // service: {
                //     select: {
                //         serviceId: true,
                //         name: true,
                //         price: true
                //     }
                // },
                // payment: {
                //     select: {
                //         paymentId: true,
                //         amount: true,
                //         status: true,
                //         provider: true,
                //         transactionId: true
                //     }
                // },
                // review: {
                //     select: {
                //         reviewId: true,
                //         rating: true,
                //         comment: true
                //     }
                // }
            },
            orderBy: {
                createdAt: "desc"
            }
        }),
        prisma.booking.count({ where: whereConditions })
    ]);
    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages: Math.ceil(total / limitNumber)
        },
        data: bookings
    };
};
export const adminService = {
    getAllUsers,
    userStatusUpdate,
    allCategories,
    createCategory,
    getAllBookingsForAdmin
};
//# sourceMappingURL=admin.service.js.map