import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class CardController {
    static list = async (req, res, next) =>
        res.json({ data: await prisma.user.findMany() });
    static read = async (req, res, next) =>
        res.json({
            data: await prisma.user.findUnique({
                where: {
                    id: Number(req.params.id),
                },
                include: {
                    Position: true,
                    Status: true,
                    Addresses: true,
                    Logs: true,
                    Cards: true,
                },
            }),
        });
    static create = async (req, res, next) => {
        try {
            res.status(201).json({
                data: await prisma.user.create({
                    data: {
                        first_name: req.body.data.first_name,
                        last_name: req.body.data.last_name,
                        positionId: req.body.data.positionId,
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
                data: await prisma.user.update({
                    where: {
                        id: Number(req.params.id),
                    },
                    data: {
                        first_name: req.body.data.first_name,
                        last_name: req.body.data.last_name,
                        positionId: req.body.data.positionId,
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
                    data: await prisma.user.delete({
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
