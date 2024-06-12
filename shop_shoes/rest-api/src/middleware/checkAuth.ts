import { NextFunction, Request } from "express";

export function checkAuth(_req: any, _res: any, _next: any) {
    _next();
}