import { NextFunction, Request, Response } from "express";
import { Users } from "../models/Users";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { UserVouchers } from "../models/UserVouchers";
import { Vouchers } from "../models/Vouchers";

const UserController = {
  getInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId; // Kiểm tra xem `req.userId` có giá trị không

      if (!userId) {
        return res.status(400).json({
          code: RESPONSE_CODE.ERRORS,
          message: "User ID không hợp lệ",
        });
      }

      // Lấy danh sách voucher của người dùng
      const userVouchers = await UserVouchers.findAll({
        where: { userId }, // Sử dụng `userId` trong câu truy vấn
        include: [
          {
            model: Vouchers,
          },
        ],
      });

      // Ghi log dữ liệu để kiểm tra
      console.log("User Vouchers:", JSON.stringify(userVouchers, null, 2));

      // Xử lý dữ liệu và trả về
      const vouchersDetails = userVouchers.map((userVoucher) => ({
        id: userVoucher.id,
        userId: userVoucher.userId,
        voucherId: userVoucher.voucherId,
        receivedAt: userVoucher.receivedAt,
        usedAt: userVoucher.usedAt,
        status: userVoucher.status,
        voucher: {
          voucherId: userVoucher.vouchers.voucherId,
          code: userVoucher.vouchers.code,
          description: userVoucher.vouchers.description,
          valueOrder: userVoucher.vouchers.valueOrder,
        },
      }));

      return res.json(
        ResponseBody({
          data: vouchersDetails,
          code: RESPONSE_CODE.SUCCESS,
          message: "Lấy danh sách voucher thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
