import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors"
import config from "./config";
import { prisma } from "./lib/prisma";
import HttpStatus from "http-status";
import bcrypt from "bcryptjs";

const app: Application = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: config.app_url,
    credentials: true
}))

app.get('/', async (req: Request, res: Response) => {
    const user = await prisma.user.findMany();
    console.log(user);
    res.send("Hellow World!")
});

app.post('/api/auth/registration', async (req: Request, res: Response) => {
    const payload = req.body
    console.log(payload);
    const { name, email, password, phone, role } = payload
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
            phone
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            createdAt: true
        }
    });
    res.status(HttpStatus.OK).json({
        message: "User Registered Successfully",
        data: createdUser
    })
})

export default app;