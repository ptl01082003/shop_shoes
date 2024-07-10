import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body?.token || "";
    if (!token)
      return res.status(401).json({
        code: 1,
        data: null,
        message: "Bạn chưa đăng nhập",
      });
    jwt.verify(
      token,
      process.env.AC_TOKEN_KEY as Secret,
      (err: any, decode: any) => {
        if (err) {
          return res.status(403).json({
            code: 1,
            data: null,
            message: "Bạn không có quyền truy cập",
          });
        }
        req.userId = decode?.userId;
        next();
      }
    );
  } catch (error) {}
};
