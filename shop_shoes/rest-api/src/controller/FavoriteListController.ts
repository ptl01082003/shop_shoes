import FavoriteList from "../models/FavoriteList";
import { Request, Response } from "express";


const FavoriteListController = {
  //  Lấy tất cả sản phẩm cùng với thông tin con
  getFavoriteList: async (req: Request, res: Response) => {
    try {
      const address = await FavoriteList.findAll({
      });
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  getFavoriteListById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const address = await FavoriteList.findByPk(id);
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

  createFavoriteList: async (req: Request, res: Response) => {
    try {
      const { SanPham, KhachHang } = req.body;
console.log(req.body)
      // Tìm sản phẩm với primary key là SanPham (giả sử SanPham là khóa chính của Product)
      const sanPham = await FavoriteList.findByPk(SanPham);
      const khachhang = await FavoriteList.findByPk(KhachHang);
      const existingEntry = await FavoriteList.findOne({ where: { KhachHang, SanPham } });
      if (existingEntry) {
        return res.status(409).json({ message: "Sản phẩm khuyến mại đã tồn tại" });
      }

      // Tạo hình ảnh mới và liên kết với sản phẩm đã tìm thấy
      const newImage = await FavoriteList.create({
        KhachHang,
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
  updateFavoriteList: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
       const { SanPham, KhachHang } = req.body;
      const sanPham = await FavoriteList.findByPk(SanPham);
      const khachhang = await FavoriteList.findByPk(KhachHang);
      const updateData = req.body;
  
      // Tìm sản phẩm khuyến mại dựa trên khóa chính
      const promotionProduct = await FavoriteList.findOne({ where: { KhachHang, SanPham } });
  
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
  deleteFavoriteList: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const address = await FavoriteList.findByPk(id);
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

export default FavoriteListController;
