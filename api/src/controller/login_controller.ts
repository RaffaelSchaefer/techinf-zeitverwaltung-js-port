import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";

import errorHandler from "./util.js";

const prisma = new PrismaClient();
const saltRounds = 10;

export default class LoginController {
    @errorHandler
    static async login(req: Request, res: Response, next: NextFunction) {}
    @errorHandler
    static async logout(req: Request, res: Response, next: NextFunction) {}
    @errorHandler
    static async check(req: Request, res: Response, next: NextFunction) {}
    @errorHandler
    static async register(req: Request, res: Response, next: NextFunction) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        if (!emailRegex.test(req.body.data.email))
            return res.status(400).json({ error: "Invalid email format" });
        if (!passwordRegex.test(req.body.data.password))
            return res.status(400).json({ error: "Invalid password format" });
        const admin = await prisma.admin.create({
            data: {
                name: req.body.data.name,
                password: await bcrypt.hash(req.body.data.password, saltRounds),
                email: req.body.data.email,
            },
        });
        return res.status(201).json({
            data: { name: admin.name, email: admin.email },
        });
    }
    //TODO make this a protected route
    @errorHandler
    static async forget(req: Request, res: Response, next: NextFunction) {
        const admin = await prisma.admin.delete({
            where: { email: req.body.data.name },
        });
    }
}
