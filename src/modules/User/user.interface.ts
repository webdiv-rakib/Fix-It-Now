import { Role } from "../../../generated/prisma/enums";

export interface ICreateUser {
    name: string,
    email: string,
    password: string,
    role?: Role,
    phone: string,
    address?: string,
    bio?: string,
    experienceYears?: number,
    skills?: string[],
    availableSlots?: string[],
    location?: string
}