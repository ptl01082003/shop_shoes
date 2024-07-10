import { Request, Response, NextFunction } from "express";
import { VoucherCustomer } from "../models/VoucherCustomer";

const VoucherCustomerController = {
  addVoucherCustomer: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { voucherId, customerId } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!voucherId || !customerId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const voucherCustomer = await VoucherCustomer.create({
        voucherId,
        customerId,
      });

      res.json({
        data: voucherCustomer,
        message: "Add new voucher-customer relationship successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getVoucherCustomers: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const voucherCustomers = await VoucherCustomer.findAll();
      res.json({ data: voucherCustomers });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getVoucherCustomerById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { voucherId, customerId } = req.params;
      const voucherCustomer = await VoucherCustomer.findOne({
        where: { voucherId, customerId },
      });
      if (voucherCustomer) {
        res.json({ data: voucherCustomer });
      } else {
        res
          .status(404)
          .json({ message: "VoucherCustomer relationship not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateVoucherCustomer: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { voucherId, customerId } = req.params;
      const { newVoucherId, newCustomerId } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!newVoucherId || !newCustomerId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const voucherCustomer = await VoucherCustomer.findOne({
        where: { voucherId, customerId },
      });

      if (voucherCustomer) {
        await voucherCustomer.update({
          voucherId: newVoucherId,
          customerId: newCustomerId,
        });
        res.json({
          message: "VoucherCustomer relationship updated successfully",
        });
      } else {
        res
          .status(404)
          .json({ message: "VoucherCustomer relationship not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteVoucherCustomer: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { voucherId, customerId } = req.params;
      const voucherCustomer = await VoucherCustomer.findOne({
        where: { voucherId, customerId },
      });

      if (voucherCustomer) {
        await voucherCustomer.destroy();
        res.json({
          message: "VoucherCustomer relationship deleted successfully",
        });
      } else {
        res
          .status(404)
          .json({ message: "VoucherCustomer relationship not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default VoucherCustomerController;
