import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class AddressController {
    static list = async (req, res, next) =>
        res.json({ data: await prisma.address.findMany() });
    static read = async (req, res, next) =>
        res.json({
            data: await prisma.address.findUnique({
                where: {
                    id: Number(req.params.id),
                },
                include: {
                    User: true,
                },
            }),
        });
    static create = async (req, res, next) => {
        try {
            res.status(201).json({
                data: await prisma.address.create({
                    data: {
                        street_name: req.body.data.street_name,
                        house_number: req.body.data.house_number,
                        town_name: req.body.data.town_name,
                        postal_code: req.body.data.postal_code,
                        country: req.body.data.country,
                        userId: req.body.data.userId,
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
                data: await prisma.address.update({
                    where: {
                        id: Number(req.params.id),
                    },
                    data: {
                        street_name: req.body.data.street_name,
                        house_number: req.body.data.house_number,
                        town_name: req.body.data.town_name,
                        postal_code: req.body.data.postal_code,
                        country: req.body.data.country,
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
                    data: await prisma.address.delete({
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
