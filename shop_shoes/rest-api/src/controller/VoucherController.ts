import { Request, Response, NextFunction } from "express";
import { Vouchers } from "../models/Vouchers";

const VoucherController = {
  // CREATE - Add a new voucher
  addVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        voucherDescribe,
        voucherDiscountType,
        voucherDiscount,
        voucherValueOder,
        voucherDiscountMax,
        voucherStartDay,
        voucherEndDay,
        voucherQuantity,
        voucherStatusDelete,
        voucherFormPay,
        voucherStatus,
        voucherObjectuUse,
      } = req.body;

      const voucher = await Vouchers.create({
        voucherDescribe,
        voucherDiscountType,
        voucherDiscount,
        voucherValueOder,
        voucherDiscountMax,
        voucherStartDay,
        voucherEndDay,
        voucherQuantity,
        voucherStatusDelete,
        voucherFormPay,
        voucherStatus,
        voucherObjectuUse,
      });

      res.json({ data: voucher, message: "Voucher added successfully" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // READ - Get all vouchers
  getVouchers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vouchers = await Vouchers.findAll();
      res.json({ data: vouchers });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // READ - Get voucher by ID
  getVoucherById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const voucher = await Vouchers.findByPk(id);
      if (voucher) {
        res.json({ data: voucher });
      } else {
        res.status(404).json({ message: "Voucher not found" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // UPDATE - Update voucher by ID
  updateVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { voucherDescribe, voucherDiscount } = req.body;

      const voucher = await Vouchers.findByPk(id);
      if (voucher) {
        await voucher.update({
          voucherDescribe,
          voucherDiscount,
        });
        res.json({ message: "Voucher updated successfully" });
      } else {
        res.status(404).json({ message: "Voucher not found" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // DELETE - Delete voucher by ID
  deleteVoucher: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const voucher = await Vouchers.findByPk(id);
      if (voucher) {
        await voucher.destroy();
        res.json({ message: "Voucher deleted successfully" });
      } else {
        res.status(404).json({ message: "Voucher not found" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default VoucherController;
