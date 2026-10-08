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

export interface IUpdateProfile {
    name?: string,
    phone?: string,
    address?: string
}

export interface IUpdatedTechnicianProfile {
    bio?: string,
    experienceYears?: number,
    location?: string,
    skills?: string[],
    availableSlots?: string[]
}