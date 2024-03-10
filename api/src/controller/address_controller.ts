import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

import errorHandler from "./util.js";
import { authHandler } from "./login_controller.js";

const prisma = new PrismaClient();

export default class AddressController {
    @errorHandler
    @authHandler
    static async list(req: Request, res: Response, next: NextFunction) {
        return res.json({
            data: await prisma.address.findMany({
                orderBy: {
                    street_name: "asc",
                },
            }),
        });
    }
    @errorHandler
    @authHandler
    static async read(req: Request, res: Response, next: NextFunction) {
        return res.json({
            data: await prisma.address.findUnique({
                where: {
                    id: Number(req.params.id),
                },
                include: {
                    User: true,
                },
            }),
        });
    }
    @errorHandler
    @authHandler
    static async create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({
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
    }
    @errorHandler
    @authHandler
    static async update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
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
    }
    @errorHandler
    @authHandler
    static async delete(req: Request, res: Response, next: NextFunction) {
        if (req.body.data.confirm) {
            return res.status(204).json({
                data: await prisma.address.delete({
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
