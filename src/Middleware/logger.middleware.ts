import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        const time = new Date().toUTCString()
        console.log(`${req.method} ${req.originalUrl} fecha: ${time}`);
    next()
    }
}