import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody, STATUS_CODE } from "../constants";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body?.token || "";
    if (!token)
      return res.status(STATUS_CODE.NOT_AUTHEN).json(
        ResponseBody({
          data: null,
          code: RESPONSE_CODE.ERRORS,
          message: "Bạn chưa đăng nhập",
        })
      );
    jwt.verify(
      token,
      process.env.AC_TOKEN_KEY as Secret,
      (err: any, decode: any) => {
        if (err) {
          return res.status(STATUS_CODE.NOT_AUTHOR).json(
            ResponseBody({
              data: null,
              code: RESPONSE_CODE.ERRORS,
              message: "Bạn không có quyền truy cập",
            })
          );
        }
        req.userId = decode?.userId;
        next();
      }
    );
  } catch (error) {}
};
