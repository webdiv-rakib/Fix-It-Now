import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { ICreateUser } from "./user.interface";

const createUser = async (payload: ICreateUser) => {
    const { name, email, password, phone, role, bio, experienceYears, availableSlots, location, skills } = payload
    const isUserExists = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (isUserExists) {
        throw new Error("User Already Exists")
    };
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            bio,
            experienceYears,
            availableSlots,
            location,
            skills
        }
    });
    if (role === "TECHNICIAN") {
        await prisma.technicianProfile.create({
            data: {
                userId: createdUser.userId,
                bio: bio || null,
                experienceYears: experienceYears || 0,
                availableSlots: availableSlots || [],
                location: location || null,
                skills: skills || []
            }
        })
    };
    const user = await prisma.user.findUnique({
        where: {
            userId: createdUser.userId,
            email: createdUser.email
        },
        omit: {
            password: true,
            updatedAt: true
        },
        include: {
            technicianProfile: {
                omit: {
                    updatedAt: true,
                    userId: true
                }
            }
        },
    })
    return user
};

export const userService = {
    createUser
}