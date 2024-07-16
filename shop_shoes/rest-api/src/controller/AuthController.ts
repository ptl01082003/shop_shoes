import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Users } from "../models/Users";
import { RESPONSE_CODE, ResponseBody } from "../constants";

let arrSecret: any[] = [];

const authCtrl = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, password, phone, email, userName } = req.body;
    const getUsers = await Users.findOne({ where: { userName } });
    if (getUsers) {
      return res.status(203).json({ data: "Username đã tồn tại" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await Users.create({
      fullName,
      phone,
      email,
      userName,
      password: hashPassword,
    });
    return res.status(400).json({ data: "Đăng ký tài khoản thành công" });
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userName, password } = req.body;
      const user = await Users.findOne({ where: { userName: userName } });

      const isMatch = await bcrypt.compare(password, user?.password || "");
      if (isMatch) {
        const accessToken = authCtrl.generateAccessToken(user?.userId + "");
        const refreshToken = authCtrl.generateRefreshToken(user?.userId + "");
        return res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: {
            accessToken,
            refreshToken,
          },
        });
      } else {
        return res
          .status(401)
          .json({ message: "Thực hiện thất bại" });
      }
    } catch (error) {
      next(error);
    }
  },
  logOut: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token;

      if (!refresh_token) {
        return res.status(401).json({ message: "Refresh token is required" });
      }

      let userId: string | undefined;
      try {
        const decoded = jwt.decode(refresh_token);

        // Kiểm tra decoded không phải null và là một đối tượng
        if (
          decoded &&
          typeof decoded === "object" &&
          decoded.hasOwnProperty("userId")
        ) {
          userId = decoded.userId as string; // Ép kiểu vì decoded có thể là JwtPayload
        } else {
          throw new Error("Invalid refresh token");
        }
      } catch (error) {
        return res
          .status(401)
          .json({ message: "Invalid refresh token format" });
      }

      // await client.del(`rf_${userId}`);
      res.clearCookie("refresh_token");
      res.status(200).json({ message: "Logged out successfully!" });
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
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token)
        return res.status(401).json({ message: "Unauthenticated User" });

      const decoded = jwt.decode(refresh_token) as { userId: string } | null;
      if (!decoded || !decoded.userId)
        return res
          .status(401)
          .json({ message: "Invalid refresh token format" });

      // const redis_rftoken = await client.get(`rf_${decoded.userId}`);
      // if (redis_rftoken === refresh_token) {
      //   const newToken = authCtrl.generateAccessToken(decoded.userId);
      //   return res.json({ data: { access_token: newToken } });
      // }

      return res.status(401).json({ message: "Refresh token has expired" });
    } catch (error) {
      next(error);
    }
  },

  generateAccessToken: (userId?: string) => {
    return jwt.sign({ userId }, process.env.AC_TOKEN_KEY as string, {
      expiresIn: "7d",
    });
  },

  generateRefreshToken: (userId?: string) => {
    return jwt.sign({ userId }, process.env.AC_RFTOKEN_KEY as string, {
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
