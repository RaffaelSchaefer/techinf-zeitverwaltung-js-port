import { PrismaClient } from "@prisma/client";

//TODO write Error Handler (decorator)

const prisma = new PrismaClient();

export default class PositionController {
    static list = async (req, res, next) =>
        res.json({ data: await prisma.position.findMany() });
    static read = async (req, res, next) =>
        res.json({
            data: await prisma.position.findUnique({
                where: {
                    id: Number(req.params.id),
                },
                include: {
                    Users: true,
                },
            }),
        });
    static create = async (req, res, next) => {
        try {
            res.status(201).json({
                data: await prisma.position.create({
                    data: { name: req.body.data.name },
                }),
            });
        } catch (error) {
            res.status(400).json({ error: String(error) });
        }
    };
    static update = async (req, res, next) => {
        try {
            res.status(200).json({
                data: await prisma.position.update({
                    where: {
                        id: Number(req.params.id),
                    },
                    data: {
                        name: req.body.data.name,
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
                    data: await prisma.position.delete({
                        where: {
                            id: Number(req.params.id),
                        }
                    }),
                });
            } else {
                throw Error("No Confirmation")
            }
        } catch (error) {
            res.status(400).json({ error: String(error) });
        }
    }
}
