import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import errorHandler from "./util.js";

const prisma = new PrismaClient();
const saltRounds = 10;
const key = process.env.JWS_KEY || "42"; //42 is the answer to everything

interface decodedToken {
    email: string;
    name: string;
    iat: number;
    exp: number;
}

export function authHandler(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) throw new Error("No token provided");
            const decoded: decodedToken = jwt.verify(token, key);
            if (decoded.exp < Date.now() / 1000)
                throw new Error("Token expired");
            const admin = await prisma.admin.findUnique({
                where: { name: decoded.name },
            });
            if (!admin) throw new Error("Admin not found");
            if (admin.verified === false) throw new Error("Admin not verified");
            await originalMethod.apply(this, [req, res, next]);
        } catch (error) {
            throw new Error(String(error));
        }
    };

    return descriptor;
}

export default class LoginController {
    @errorHandler
    static async login(req: Request, res: Response, next: NextFunction) {
        const admin = await prisma.admin.findUnique({
            where: { name: req.body.data.name },
        });
        if (!admin)
            return res.status(400).json({ error: "Username not found" });
        const match = await bcrypt.compare(
            req.body.data.password,
            admin.password
        );
        if (!match)
            return res.status(400).json({ error: "Password incorrect" });
        const token = jwt.sign({ name: admin.name, email: admin.email }, key, {
            expiresIn: "1h",
        });
        return res.status(200).json({ data: { token: token } });
    }
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
    @errorHandler
    @authHandler
    static async forget(req: Request, res: Response, next: NextFunction) {
        return res.status(204).json({
            data: await prisma.admin.delete({
                where: { name: req.params.name },
            }),
        });
    }
}
