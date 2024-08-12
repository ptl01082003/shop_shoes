import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Vouchers } from "../models/Vouchers";
import { UserVouchers } from "../models/UserVouchers";
import { Users } from "../models/Users";

const VouchersController = {
  // Tạo mới một voucher
  addVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        code,
        description,
        valueOrder,
        disscoutMax,
        startDay,
        endDay,
        quantity,
        status,
        typeValue,
        ruleType,
        minOrderValue,
        validProducts,
        userLevel,
        minOrderCount,
        maxOrderCount,
        productId,
      } = req.body;

      const voucher = await Vouchers.create({
        code,
        description,
        valueOrder,
        disscoutMax,
        startDay,
        endDay,
        quantity,
        status,
        typeValue,
        ruleType,
        minOrderValue,
        validProducts,
        userLevel,
        minOrderCount,
        maxOrderCount,
        productId,
      });

      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: voucher,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  // Lấy tất cả các voucher
  getVouchers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vouchers = await Vouchers.findAll();
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: vouchers,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  // Lấy một voucher theo ID
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { voucherId } = req.params;
      const voucher = await Vouchers.findByPk(voucherId);
      if (voucher) {
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            data: voucher,
            message: "Thực hiện thành công",
          })
        );
      } else {
        res.status(404).json(
          ResponseBody({
            code: RESPONSE_CODE.NOT_FOUND,
            message: "Voucher không tồn tại",
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },

  // Cập nhật một voucher theo ID
  updateVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        voucherId,
        code,
        description,
        valueOrder,
        disscoutMax,
        startDay,
        endDay,
        quantity,
        status,
        typeValue,
        ruleType,
        minOrderValue,
        validProducts,
        userLevel,
        minOrderCount,
        maxOrderCount,
        productId,
      } = req.body;

      const voucher = await Vouchers.findByPk(voucherId);
      if (voucher) {
        await voucher.update({
          code,
          description,
          valueOrder,
          disscoutMax,
          startDay,
          endDay,
          quantity,
          status,
          typeValue,
          ruleType,
          minOrderValue,
          validProducts,
          userLevel,
          minOrderCount,
          maxOrderCount,
          productId,
        });

        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            data: voucher,
            message: "Thực hiện thành công",
          })
        );
      } else {
        res.status(404).json(
          ResponseBody({
            code: RESPONSE_CODE.NOT_FOUND,
            message: "Voucher không tồn tại",
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },

  // Xóa một voucher theo ID
  deleteVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { voucherId } = req.params;
      const voucher = await Vouchers.findByPk(voucherId);
      if (voucher) {
        await voucher.destroy();
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: "Thực hiện thành công",
          })
        );
      } else {
        res.status(404).json(
          ResponseBody({
            code: RESPONSE_CODE.NOT_FOUND,
            message: "Voucher không tồn tại",
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },
  getVoucherByUserId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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

export default VouchersController;
