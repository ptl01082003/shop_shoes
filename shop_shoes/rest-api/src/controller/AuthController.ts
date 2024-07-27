import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { redis } from "../config/ConnectRedis";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { ROLE_TYPES, Roles } from "../models/Roles";
import { Users } from "../models/Users";

const authCtrl = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { fullName, password, phone, email, userName } = req.body;
      const getUsers = await Users.findOne({ where: { userName } });
      if (getUsers) {
        return res.json(
          ResponseBody({
            data: null,
            code: RESPONSE_CODE.ERRORS,
            message: "Username đã tồn tại",
          })
        );
      }
      const hashPassword = await bcrypt.hash(password, 10);
      await Users.create({
        fullName,
        phone,
        email,
        userName,
        password: hashPassword,
      });
      return res.json(
        ResponseBody({
          data: null,
          code: RESPONSE_CODE.SUCCESS,
          message: "Đăng ký tài khoản thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },
  loginWeb: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, password } = req.body;
      console.log("userName", userName);
      const user = await Users.findOne({
        where: { userName: userName },
        include: {
          model: Roles,
        },
      });
      console.log("user", user);
      if (user) {
        const isHavePassword = await bcrypt.compare(
          password,
          user.password || ""
        );
        if (isHavePassword) {
          const accessToken = authCtrl.generateAccessToken({
            userId: user.userId,
          });
          const refreshToken = authCtrl.generateRefreshToken({
            userId: user.userId,
          });
          await redis.set(`roles-${user.userId}`, user.roles.type);
          await redis.set(`accessToken-${user.userId}`, accessToken);
          await redis.set(`refreshToken-${user.userId}`, refreshToken);
          return res.json(
            ResponseBody({
              data: {
                accessToken,
                refreshToken,
              },
              code: RESPONSE_CODE.SUCCESS,
              message: "Thực hiện thành công",
            })
          );
        } else {
          return res.json(
            ResponseBody({
              data: null,
              code: RESPONSE_CODE.ERRORS,
              message: "Tài khoản hoặc mật khẩu không đúng",
            })
          );
        }
      } else {
        return res.json(
          ResponseBody({
            data: null,
            code: RESPONSE_CODE.ERRORS,
            message: "Tài khoản không tồn tại",
          })
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  loginDashboard: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, password } = req.body;
      const user = await Users.findOne({
        where: { userName: userName },
        include: {
          model: Roles,
        },
      });

      if (user) {
        const isHavePassword = await bcrypt.compare(
          password,
          user.password || ""
        );
        if (user.roles.type == ROLE_TYPES.USER) {
          return res.json(
            ResponseBody({
              data: null,
              code: RESPONSE_CODE.ERRORS,
              message: "Không có quyền truy cập",
            })
          );
        }
        if (isHavePassword) {
          const accessToken = authCtrl.generateAccessToken({
            userId: user.userId,
          });
          const refreshToken = authCtrl.generateRefreshToken({
            userId: user.userId,
          });
          await redis.set(`roles-${user.userId}`, user.roles.type);
          await redis.set(`accessToken-${user.userId}`, accessToken);
          await redis.set(`refreshToken-${user.userId}`, refreshToken);
          return res.json(
            ResponseBody({
              data: {
                accessToken,
                refreshToken,
              },
              code: RESPONSE_CODE.SUCCESS,
              message: "Thực hiện thành công",
            })
          );
        } else {
          return res.json(
            ResponseBody({
              data: null,
              code: RESPONSE_CODE.ERRORS,
              message: "Tài khoản hoặc mật khẩu không đúng",
            })
          );
        }
      } else {
        return res.json(
          ResponseBody({
            data: null,
            code: RESPONSE_CODE.ERRORS,
            message: "Tài khoản không tồn tại",
          })
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  logOut: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      await redis.del(`roles-${userId}`);
      await redis.del(`accessToken-${userId}`);
      await redis.del(`refreshToken-${userId}`);
      return res.json(
        ResponseBody({
          data: null,
          code: RESPONSE_CODE.SUCCESS,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  requestRefreshToken: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { refreshToken } = req.body;
      jwt.verify(
        refreshToken,
        process.env.AC_RFTOKEN_KEY as Secret,
        async (err: any, decoded: any) => {
          if (err) {
            return res.json(
              ResponseBody({
                data: null,
                code: RESPONSE_CODE.ERRORS,
                message: "Hết hạn refresh token vui lòng đăng nhập lại",
              })
            );
          } else {
            const rfTokenInRedis = await redis.get(
              `refreshToken-${decoded.userId}`
            );
            const accessToken = authCtrl.generateAccessToken({
              userId: decoded.userId,
            });
            await redis.set(`accessToken-${decoded.userId}`, accessToken);
            if (refreshToken === rfTokenInRedis) {
              return res.json(
                ResponseBody({
                  data: accessToken,
                  code: RESPONSE_CODE.SUCCESS,
                  message: "Thực hiện thành công",
                })
              );
            } else {
              return res.json(
                ResponseBody({
                  data: null,
                  code: RESPONSE_CODE.INCORRECT,
                  message: "Refresh Token không hợp lệ",
                })
              );
            }
          }
        }
      );
    } catch (error) {
      next(error);
    }
  },

  generateAccessToken: (params: any) => {
    return jwt.sign(params, process.env.AC_TOKEN_KEY as string, {
      expiresIn: "1d",
    });
  },

  generateRefreshToken: (params: any) => {
    return jwt.sign(params, process.env.AC_RFTOKEN_KEY as string, {
      expiresIn: "7d",
    });
  },

  //   sendMail: async (req: AuthRequest, res: Response, next: NextFunction) => {
  //     try {
  //       const { email } = req.body;
  //       const user = await Staff.findOne({ where: { Email: email } });
  //       if (!user) return res.status(404).json({ message: "User not found" });

  //       // Add your SendMail, GenerateSecret, GenerateOtp, ArraySecret functions implementation
  //       const secret = GenerateSecret();
  //       const otp = GenerateOtp(secret);
  //       const mang = ArraySecret(email, secret, otp, arrSecret);
  //       arrSecret = mang;
  //       await SendMail(email, user.HoVaTen, otp);

  //       return res.json({ err: "Check the verification code in the email" });
  //     } catch (error) {
  //       next(error);
  //     }
  //   },

  //   verifyOtp: async (req: AuthRequest, res: Response, next: NextFunction) => {
  //     try {
  //       const { email, otp, password } = req.body;
  //       const a = ArraySecret(email, otp, password, arrSecret);
  //       if (a === "success") {
  //         arrSecret = [];
  //         const passwordHash = await bcrypt.hash(password, 10);
  //         await Staff.update(
  //           { Password: passwordHash },
  //           { where: { Email: email } }
  //         );
  //         return res.json({ message: "Password updated successfully" });
  //       } else {
  //         return res.json({ message: "OTP verification failed" });
  //       }
  //     } catch (error) {
  //       next(error);
  //     }
  //   },
};

export default authCtrl;
