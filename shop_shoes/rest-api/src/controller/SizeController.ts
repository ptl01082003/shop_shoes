import Size from "../models/Size";
import { Request, Response } from "express";


const SizeController = {
  //  Lấy tất cả sản phẩm cùng với thông tin con
  getSize: async (req: Request, res: Response) => {
    try {
      const address = await Size.findAll({
      });
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  getSizeById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const address = await Size.findByPk(id);
      if (address) {
        res.status(200).json(address);
      } else {
        res.status(404).json({ error: "Colour not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Tạo một thương hiệu mới

  createSize: async (req: Request, res: Response) => {
    try {
   
      const Ma = req.body?.Ma;
      console.log(Ma)
      const ChieuDai = req.body?.ChieuDai ;
      console.log(ChieuDai)
      const NgayTao = new Date();
      console.log(NgayTao)
      const NgayCapNhat = new Date();
      console.log(NgayCapNhat)
    
      // Tạo màu mới trong cơ sở dữ liệu
      const colour = await Size.create({ Ma,ChieuDai, NgayTao, NgayCapNhat });

      // Trả về kết quả thành công
      res.status(201).json(colour);
    } catch (error) {
      console.log(error);
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình tạo màu
      console.error("Error creating colour:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Cập nhật một thương hiệu
  updateSize: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log("id :", id);
      const Ma = req.body?.Ma;
      console.log(Ma)
      const ChieuDai = req.body?.ChieuDai;
      console.log(Ma)
      const NgayTao = req.body?.NgayTao;
      console.log(NgayTao)
      const NgayCapNhat = req.body?.NgayCapNhat;
      console.log(NgayCapNhat)
      const colour = await Size.findByPk(id);
      if (colour) {
        await colour.update({ Ma,ChieuDai, NgayTao, NgayCapNhat });
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
  deleteSize: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const address = await Size.findByPk(id);
      console.log(address);
      console.log("createColour called");
      if (address) {
        await address.destroy();
        res.status(200).json({ message: "Dòng sản phầm đã được xóa" });
      } else {
        res.status(404).json({ message: "Dòng sản phầm không tìm thấy" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
};

export default SizeController;
