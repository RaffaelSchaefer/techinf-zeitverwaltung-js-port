import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

import errorHandler from "./util.js";
import { authHandler } from "./login_controller.js";

const prisma = new PrismaClient();

export default class UserController {
    @errorHandler
    @authHandler
    static async list(req: Request, res: Response, next: NextFunction) {
        return res.json({ data: await prisma.user.findMany({
            orderBy: {
                first_name: 'asc',
            }
        }) });
    }
    @errorHandler
    @authHandler
    static async read(req: Request, res: Response, next: NextFunction) {
        return res.json({
            data: await prisma.user.findUnique({
                where: {
                    id: Number(req.params.id),
                },
                include: {
                    Position: true,
                    Addresses: true,
                    Logs: true,
                    Cards: true,
                },
            }),
        });
    }
    @errorHandler
    @authHandler
    static async create(req: Request, res: Response, next: NextFunction) {
        return res.status(201).json({
            data: await prisma.user.create({
                data: {
                    first_name: req.body.data.first_name,
                    last_name: req.body.data.last_name,
                    positionId: req.body.data.positionId,
                },
            }),
        });
    }
    @errorHandler
    @authHandler
    static async update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({
            data: await prisma.user.update({
                where: {
                    id: Number(req.params.id),
                },
                data: {
                    first_name: req.body.data.first_name,
                    last_name: req.body.data.last_name,
                    status: req.body.data.status,
                    positionId: req.body.data.positionId,
                },
            }),
        });
    }
    @errorHandler
    @authHandler
    static async delete(req: Request, res: Response, next: NextFunction) {
        if (req.body.data.confirm) {
            return res.status(204).json({
                data: await prisma.user.delete({
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
