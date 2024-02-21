import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class LogController {
    static list = async (req, res, next) =>
        res.json({ data: await prisma.log.findMany() });
    static read = async (req, res, next) =>
        res.json({
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
    static create = async (req, res, next) => {
        try {
            res.status(201).json({
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
                                                    await prisma.card.findUnique(
                                                        {
                                                            where: {
                                                                uid: req.body
                                                                    .data
                                                                    .cardUid,
                                                            },
                                                        }
                                                    )
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
        } catch (error) {
            res.status(400).json({ error: String(error) });
        }
    };
    static update = async (req, res, next) => {
        try {
            res.status(200).json({
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
        } catch (error) {
            res.status(400).json({ error: String(error) });
        }
    };
    static delete = async (req, res, next) => {
        try {
            if (req.body.data.confirm) {
                res.status(204).json({
                    data: await prisma.log.delete({
                        where: {
                            id: Number(req.params.id),
                        },
                    }),
                });
            } else {
                throw Error("No Confirmation");
            }
        } catch (error) {
            res.status(400).json({ error: String(error) });
        }
    };
}
