import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors"
import config from "./config";
import { prisma } from "./lib/prisma";
import { userRoutes } from "./modules/User/user.routes";
import { authRoutes } from "./modules/Auth/auth.routes";

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

//all routes
app.use('/api/auth', authRoutes); // jwt access and refresh token routes
app.use('/api/auth', userRoutes); // registration routes


export default app;