import { Request, Response } from "express";
import Promotion from "../models/Promotion";

const PromotionController = {
  getPromotion: async (req: Request, res: Response) => {
    try {
      const colour = await Promotion.findAll();
      res.status(200).json(colour);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  //// lấy id
  getPromotionById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const colour = await Promotion.findByPk(id);
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

  createPromotion: async (req: Request, res: Response) => {
    try {
      // Kiểm tra và lấy dữ liệu từ body của yêu cầu
      const Ma = req.body?.Ma;
      const Ten = req.body?.Ten;
      const Loai = req.body?.Loai;
      const MucGiam = req.body?.MucGiam;
      const NgayBatDau = req.body?.NgayBatDau;
      const NgayKetThuc = req.body?.NgayKetThuc;
      const TrangThai = req.body?.TrangThai;
     
      const NgayTao = new Date();
      const NgayCapNhat = new Date();

      // Kiểm tra xem liệu có thiếu dữ liệu không
      if (!Ten || !NgayTao || !NgayCapNhat) {
        return res
          .status(400)
          .json({ message: "Thiếu thông tin cần thiết trong yêu cầu" });
    }


    console.log(req.body)
      // Tạo màu mới trong cơ sở dữ liệu
      const colour = await Promotion.create({ Ma,Ten,Loai,MucGiam,NgayBatDau,NgayKetThuc,NgayTao,NgayCapNhat,TrangThai });

      // Trả về kết quả thành công
      res.status(201).json(colour);
    } catch (error) {
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình tạo màu
      console.error("Error creating colour:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  

  // Cập nhật một thương hiệu
  updatePromotion: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      console.log("id :", id);
      
      const Ten = req.body?.Ten;
      const Loai = req.body?.Loai;
      const MucGiam = req.body?.MucGiam;
      const NgayBatDau = req.body?.NgayBatDau;
      const NgayKetThuc = req.body?.NgayKetThuc;
      const TrangThai = req.body?.TrangThai;
      const NgayTao = req.body?.NgayTao;
      const NgayCapNhat = req.body?.NgayBatDau;

      const colour = await Promotion.findByPk(id);
      if (colour) {
        await colour.update({ Ten,Loai,MucGiam,NgayBatDau,NgayKetThuc,NgayTao,NgayCapNhat,TrangThai });
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
  deletePromotion: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const colour = await Promotion.findByPk(id);
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

export default PromotionController;
