import { Request, Response } from "express";
import CustomerVouchers from "../models/CustomerVouchers";

const CustomerVouchersController = {
  getCustomerVouchers: async (req: Request, res: Response) => {
    try {
      const customerVouchers = await CustomerVouchers.findAll();
      res.status(200).json(customerVouchers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  
  },

  //// lấy id
  getCustomerVouchersById: async (req: Request, res: Response) => {
    try {
      const { Voucher, KhachHang } = req.params;
  
      // Tìm kiếm CustomerVoucher dựa trên Voucher và KhachHang
      const customerVoucher = await CustomerVouchers.findOne({
        where: {
          Voucher,
          KhachHang,
        },
      });
  
      if (customerVoucher) {
        // Trả về Voucher và KhachHang
        res.status(200).json({
          Voucher: customerVoucher.Voucher,
          KhachHang: customerVoucher.KhachHang,
        });
      } else {
        res.status(404).json({ message: "Customer voucher không tồn tại" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Tạo một thương hiệu mới

  createCustomerVoucher: async (req: Request, res: Response) => {
    try {
      const { Voucher, KhachHang } = req.body;
  
      const customerVoucher = await CustomerVouchers.create({
        Voucher,
        KhachHang,
      });
  
      res.status(201).json(customerVoucher);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  
  updateCustomerVoucher: async (req: Request, res: Response) => {
    try {
      const { Voucher, KhachHang } = req.params;
      const { newVoucher, newKhachHang } = req.body;
  
      const customerVoucher = await CustomerVouchers.findOne({
        where: {
          Voucher,
          KhachHang,
        },
      });
  
      if (customerVoucher) {
        await customerVoucher.update({
          Voucher: newVoucher || customerVoucher.Voucher,
          KhachHang: newKhachHang || customerVoucher.KhachHang,
        });
  
        res.status(200).json(customerVoucher);
      } else {
        res.status(404).json({ message: "Customer voucher không tìm thấy" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  

  // Xóa một thương hiệu
  deleteCustomerVouchers: async (req: Request, res: Response) => {
    console.log("deleteCustomerVouchers called");
    try {
      const { Voucher, KhachHang } = req.params;
    
      
      const customerVoucher = await CustomerVouchers.findOne({
        where: {
          Voucher,
          KhachHang,
        },
      });
      
      if (customerVoucher) {
        await customerVoucher.destroy();
        res.status(200).json({ message: "Customer Voucher has been deleted" });
      } else {
        res.status(404).json({ message: "Customer Voucher not found" });
      }
    } catch (error) {
      console.error('Error deleting CustomerVoucher record:', error);
      res.status(500).json({ message: "Internal server error occurred" });
    }
  },
}

export default CustomerVouchersController;
