import { Request, Response } from "express";
import OrderDetails from "../models/OrderDetails";
import ProductDetails from "../models/ProductDetails";
import Order from "../models/Order";

const OrderDetailsController = {
  getOrderDetails: async (req: Request, res: Response) => {
    try {
      const colour = await OrderDetails.findAll();
      res.status(200).json(colour);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  //// lấy id
  getOrderDetailsById: async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const colour = await OrderDetails.findByPk(id);
      if (colour) {
        res.status(200).json(colour);
      } else {
        res.status(404).json({ error: "Colour not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Tạo một thương hiệu mới

  createOrderDetails: async (req: Request, res: Response) => {
    try {
      // Kiểm tra và lấy dữ liệu từ body của yêu cầu
      const ChiTietSanPham = req.body?.ChiTietSanPham;
      const DonHang = req.body?.DonHang;
      const SoLuong = req.body?.SoLuong;
      const DonGia = req.body?.DonGia;
      const DonGiaSauGiam = req.body?.DonGiaSauGiam;


      const oder = await Order.findByPk(DonHang);
      
      const productdetails = await ProductDetails.findByPk(ChiTietSanPham);
    
      
      
      // Tạo màu mới trong cơ sở dữ liệu
      const oderdtails = await OrderDetails.create({
        ChiTietSanPham: productdetails?.id,
        DonHang: oder?.Ma,
        SoLuong,
        DonGia,
        DonGiaSauGiam,
      });

      // Trả về kết quả thành công
      res.status(201).json(oderdtails);
    } catch (error) {
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình tạo màu
      console.error("Error creating colour:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  

  // Cập nhật một thương hiệu
  updateOrderDetails: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      console.log("id :", id);
      const ChiTietSanPham = req.body?.ChiTietSanPham;
      const DonHang = req.body?.DonHang;
      const SoLuong = req.body?.SoLuong;
      const DonGia = req.body?.DonGia;
      const DonGiaSauGiam = req.body?.DonGiaSauGiam;

      const colour = await OrderDetails.findByPk(id);
      if (colour) {
        await colour.update({ ChiTietSanPham,DonHang
          ,SoLuong,DonGia,DonGiaSauGiam
         });
        res.status(200).json(colour);
      } else {
        res.status(404).json({ message: "Dòng sản phầm không tìm thấy" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Xóa một thương hiệu
  deleteOrderDetails: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const colour = await OrderDetails.findByPk(id);
      console.log(colour);
      console.log("createColour called");
      if (colour) {
        await colour.destroy();
        res.status(200).json({ message: "Dòng sản phầm đã được xóa" });
      } else {
        res.status(404).json({ message: "Dòng sản phầm không tìm thấy" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  
};

export default OrderDetailsController;
