import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

import errorHandler from "./util.js";

const prisma = new PrismaClient();

export default class PositionController {
    @errorHandler
    static async list(req: Request, res: Response, next: NextFunction) {
        return res.json({ data: await prisma.position.findMany() });
    }
    @errorHandler
    static async read(req: Request, res: Response, next: NextFunction) {
        return res.json({
            data: await prisma.position.findUnique({
                where: {
                    id: Number(req.params.id),
                },
                include: {
                    Users: true,
                },
            }),
        });
    }
    @errorHandler
    static async create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({
            data: await prisma.position.create({
                data: { name: req.body.data.name },
            }),
        });
    }
    @errorHandler
    static async update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
            data: await prisma.position.update({
                where: {
                    id: Number(req.params.id),
                },
                data: {
                    name: req.body.data.name,
                },
            }),
        });
    }
    @errorHandler
    static async delete(req: Request, res: Response, next: NextFunction) {
        if (req.body.data.confirm) {
            return res.status(204).json({
                data: await prisma.position.delete({
                    where: {
                        id: Number(req.params.id),
                    },
                }),
            });
        } else {
            throw Error("No Confirmation");
        }
    }
}
