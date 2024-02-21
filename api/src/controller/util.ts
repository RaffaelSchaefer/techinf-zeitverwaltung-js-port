import { Request, Response, NextFunction } from 'express';

function errorHandler(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            await originalMethod.apply(this, [req, res, next]);
        } catch (error) {
            res.status(500).json({ error: String(error) });
        }
    };

    return descriptor;
}

export default errorHandler;