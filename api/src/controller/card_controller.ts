import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

import errorHandler from "./util.js";
import { authHandler } from "./login_controller.js";

const prisma = new PrismaClient();

export default class CardController {
    @errorHandler
    @authHandler
    static async list(req: Request, res: Response, next: NextFunction) {
        return res.json({
            data: await prisma.card.findMany({
                orderBy: {
                    uid: "asc",
                },
            }),
        });
    }
    @errorHandler
    @authHandler
    static async read(req: Request, res: Response, next: NextFunction) {
        return res.json({
            data: await prisma.card.findUnique({
                where: {
                    uid: req.params.uid,
                },
                include: {
                    User: true,
                    Logs: true,
                },
            }),
        });
    }
    @errorHandler
    @authHandler
    static async create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({
            data: await prisma.card.create({
                data: { uid: req.body.data.uid },
            }),
        });
    }
    @errorHandler
    @authHandler
    static async update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
            data: await prisma.card.update({
                where: {
                    uid: req.params.uid,
                },
                data: {
                    uid: req.body.data.uid,
                    userId: req.body.data.userId ?? null,
                },
            }),
        });
    }
    @errorHandler
    @authHandler
    static async delete(req: Request, res: Response, next: NextFunction) {
        if (req.body.data.confirm) {
            return res.status(204).json({
                data: await prisma.card.delete({
                    where: {
                        uid: req.params.uid,
                    },
                }),
            });
        } else {
            throw Error("No Confirmation");
        }
    }
}
