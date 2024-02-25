import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

import errorHandler from "./util.js";

const prisma = new PrismaClient();

export default class LogController {
    @errorHandler
    static async list(req: Request, res: Response, next: NextFunction) {
        return res.json({
            data: await prisma.log.findMany({
                orderBy: {
                    id: "desc",
                },
            }),
        });
    }
    @errorHandler
    static async read(req: Request, res: Response, next: NextFunction) {
        return res.json({
            data: await prisma.log.findUnique({
                where: {
                    id: Number(req.params.id),
                },
                include: {
                    User: true,
                    Card: true,
                },
            }),
        });
    }
    @errorHandler
    static async create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({
            data: await prisma.log.create({
                data: {
                    status: (
                        await prisma.user.update({
                            where: {
                                id: (
                                    await prisma.card.findUnique({
                                        where: {
                                            uid: req.body.data.cardUid,
                                        },
                                    })
                                ).userId,
                            },
                            data: {
                                status: !(
                                    await prisma.user.findUnique({
                                        where: {
                                            id: (
                                                await prisma.card.findUnique({
                                                    where: {
                                                        uid: req.body.data
                                                            .cardUid,
                                                    },
                                                })
                                            ).userId,
                                        },
                                    })
                                ).status,
                            },
                        })
                    ).status,
                    cardUid: req.body.data.cardUid,
                    userId: (
                        await prisma.card.findUnique({
                            where: {
                                uid: req.body.data.cardUid,
                            },
                        })
                    ).userId,
                },
            }),
        });
    }
    @errorHandler
    static async update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
            data: await prisma.log.update({
                where: {
                    id: Number(req.params.id),
                },
                data: {
                    time: req.body.data.time,
                    status: req.body.data.status,
                    cardUid: req.body.data.cardUid,
                    userId: req.body.data.userId,
                },
            }),
        });
    }
    @errorHandler
    static async delete(req: Request, res: Response, next: NextFunction) {
        if (req.body.data.confirm) {
            return res.status(204).json({
                data: await prisma.log.delete({
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
