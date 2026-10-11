import { ICreateUser, IUpdateProfile } from "./user.interface";
declare const createUser: (payload: ICreateUser) => Promise<({
    technicianProfile: {
        technicianId: string;
        bio: string | null;
        experienceYears: number;
        rating: number;
        availableSlots: string[];
        location: string | null;
        skills: string[];
        createdAt: Date;
    } | null;
} & {
    userId: string;
    name: string;
    email: string;
    role: import("../../../generated/prisma/enums").Role;
    phone: string;
    address: string | null;
    status: import("../../../generated/prisma/enums").UserStatus;
    createdAt: Date;
}) | null>;
declare const getUserProfile: (userId: string) => Promise<{
    technicianProfile: {
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
    } | null;
} & {
    userId: string;
    name: string;
    email: string;
    role: import("../../../generated/prisma/enums").Role;
    phone: string;
    address: string | null;
    status: import("../../../generated/prisma/enums").UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const updateUserProfile: (userId: string, payload: IUpdateProfile) => Promise<{
    userId: string;
    name: string;
    email: string;
    role: import("../../../generated/prisma/enums").Role;
    phone: string;
    address: string | null;
    status: import("../../../generated/prisma/enums").UserStatus;
    createdAt: Date;
    updatedAt: Date;
}>;
declare const technicianProfileUpdate: (userId: string, payload: any) => Promise<{
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
}>;
export declare const userService: {
    createUser: typeof createUser;
    getUserProfile: typeof getUserProfile;
    updateUserProfile: typeof updateUserProfile;
    technicianProfileUpdate: typeof technicianProfileUpdate;
};
export {};
//# sourceMappingURL=user.service.d.ts.map