import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody, STATUS_CODE } from "../constants";
import { redis } from "../config/ConnectRedis";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    if (token) {
      jwt.verify(
        token,
        process.env.AC_TOKEN_KEY as Secret,
        async (err: any, decoded: any) => {
          console.log(err, decoded);
          if (err) {
            return res.json(
              ResponseBody({
                data: null,
                code: RESPONSE_CODE.NOT_AUTHEN,
                message: "Bạn không có quyền truy cập",
              })
            );
          } else {
            const tokenInRedis = await redis.get(
              `accessToken-${decoded.usersID}`
            );
            if (tokenInRedis === token) {
              req.usersID = decoded.usersID;
              next();
            } else {
              return res.json(
                ResponseBody({
                  data: null,
                  code: RESPONSE_CODE.INCORRECT,
                  message: "Token không hợp lệ",
                })
              );
            }
          }
        }
      );
    } else {
      return res.status(STATUS_CODE.NOT_AUTHEN).json(
        ResponseBody({
          data: null,
          code: RESPONSE_CODE.ERRORS,
          message: "Bạn chưa đăng nhập",
        })
      );
    }
  } catch (error) {
    next(error);
  }
};
