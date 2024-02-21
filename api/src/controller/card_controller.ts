import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CardController {
    static list = async (req, res, next) =>
        res.json({ data: await prisma.card.findMany() });
    static read = async (req, res, next) =>
        res.json({
            data: await prisma.card.findUnique({
                where: {
                    uid: req.params.uid,
                },
                include: {
                    User: true,
                    Log: true,
                },
            }),
        });
    static create = async (req, res, next) => {
        try {
            res.status(201).json({
                data: await prisma.card.create({
                    data: { uid: req.body.data.uid },
                }),
            });
        } catch (error) {
            res.status(400).json({ error: String(error) });
        }
    };
    static update = async (req, res, next) => {
        try {
            res.status(200).json({
                data: await prisma.card.update({
                    where: {
                        uid: req.params.uid,
                    },
                    data: {
                        uid: req.body.data.uid,
                        userId: req.body.data.userId ?? null
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
                    data: await prisma.card.delete({
                        where: {
                            uid: req.params.uid,
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
