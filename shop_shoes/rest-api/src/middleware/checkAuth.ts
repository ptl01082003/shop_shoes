import { NextFunction, Request } from "express";
import { nextTick } from "process";

export function checkAuth(_req: any, _res: any, _next: any) {
    _next();
    
}