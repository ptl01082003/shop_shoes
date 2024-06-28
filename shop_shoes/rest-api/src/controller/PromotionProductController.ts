import { Request, Response } from "express";
import PromotionProduct from "../models/PromotionProduct";

const PromotionProductController = {
  getPromotionProduct: async (req: Request, res: Response) => {
    try {
      const colour = await PromotionProduct.findAll();
      res.status(200).json(colour);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  //// lấy id
  getPromotionProductById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const colour = await PromotionProduct.findByPk(id);
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

  createPromotionProduct: async (req: Request, res: Response) => {
    try {
      const { SanPham, KhuyenMai } = req.body;
console.log(req.body)
      // Tìm sản phẩm với primary key là SanPham (giả sử SanPham là khóa chính của Product)
      const sanPham = await PromotionProduct.findByPk(SanPham);
      const khuyenMai = await PromotionProduct.findByPk(KhuyenMai);
      const existingEntry = await PromotionProduct.findOne({ where: { KhuyenMai, SanPham } });
      if (existingEntry) {
        return res.status(409).json({ message: "Sản phẩm khuyến mại đã tồn tại" });
      }

      // Tạo hình ảnh mới và liên kết với sản phẩm đã tìm thấy
      const newImage = await PromotionProduct.create({
        KhuyenMai,
        SanPham // Sử dụng sanPham.id để liên kết với sản phẩm
      });

      // Trả về kết quả thành công
      res.status(201).json(newImage);
    } catch (error) {
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình tạo hình ảnh
      console.error("Error creating image:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  
  

  // Cập nhật một thương hiệu
  updatePromotionProduct: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { KhuyenMai, SanPham } = req.params;
      const updateData = req.body;
  
      // Tìm sản phẩm khuyến mại dựa trên khóa chính
      const promotionProduct = await PromotionProduct.findOne({ where: { KhuyenMai, SanPham } });
  
      // Kiểm tra nếu không tìm thấy sản phẩm khuyến mại
      if (!promotionProduct) {
        return res.status(404).json({ message: "Sản phẩm khuyến mại không tồn tại" });
      }
  
      // Cập nhật sản phẩm khuyến mại với dữ liệu mới
      await promotionProduct.update(updateData);
  
      // Trả về kết quả thành công
      res.status(200).json(promotionProduct);
    } catch (error) {
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình cập nhật sản phẩm khuyến mại
      console.error("Error updating promotion product:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Xóa một thương hiệu
  deletePromotionProduct: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const colour = await PromotionProduct.findByPk(id);
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

export default PromotionProductController;
