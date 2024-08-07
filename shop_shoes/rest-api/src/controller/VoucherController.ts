import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Vouchers } from "../models/Vouchers";

const VouchersController = {
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

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { vouchersId } = req.params;
      const voucher = await Vouchers.findByPk(vouchersId);
      if (voucher) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: voucher,
        });
      } else {
        res.status(404).json({
          message: "Voucher không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  updateVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        vouchersId,
        code,
        description,
        valueOrder,
        disscoutMax,
        startDay,
        endDay,
        quantity,
        status,
      } = req.body;
      const voucher = await Vouchers.findByPk(vouchersId);
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
        });
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: voucher,
        });
      } else {
        res.json({
          message: "Voucher không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { vouchersId } = req.params;
      const voucher = await Vouchers.findByPk(vouchersId);
      if (voucher) {
        await voucher.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.json({
          message: "Voucher không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },
};

export default VouchersController;
