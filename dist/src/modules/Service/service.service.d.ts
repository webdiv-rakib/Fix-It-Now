import { ICreateService, IServiceFilters, ITechnicianFilters } from "./service.interface";
declare const createService: (userId: string, payload: ICreateService) => Promise<{
    serviceId: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    technicianId: string;
}>;
declare const getAllServices: (filters: IServiceFilters) => Promise<({
    category: {
        categoryId: string;
        name: string;
    };
    technician: {
        user: {
            address: string | null;
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
    serviceId: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    technicianId: string;
})[]>;
declare const getAllTechnicians: (filters: ITechnicianFilters) => Promise<({
    reviews: {
        comment: string | null;
        createdAt: Date;
        rating: number;
    }[];
    user: {
        address: string | null;
        email: string;
        name: string;
        phone: string;
        userId: string;
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
})[]>;
export declare const serviceService: {
    createService: typeof createService;
    getAllServices: typeof getAllServices;
    getAllTechnicians: typeof getAllTechnicians;
};
export {};
//# sourceMappingURL=service.service.d.ts.map