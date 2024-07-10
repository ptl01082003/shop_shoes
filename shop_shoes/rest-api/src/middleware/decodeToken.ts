import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const  decodeToken =  (_req: any, _res: any, _next: any) => {
    // const token = req.body.
    // const {userId} = jwt.decode(req.headers("Authorization"), process.env.GENERATE_AC_TOKEN ) ||{userId: ""}
    // req.userId = userId 
    _next()
};