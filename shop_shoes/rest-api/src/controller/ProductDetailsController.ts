import { Request, Response } from "express";
import ProductDetails from "../models/ProductDetails";
import { Product } from "../models/Product";
import Size from "../models/Size";
import OrderDetails from "../models/OrderDetails";

const ProductDetailsController = {
  getProductDetails: async (req: Request, res: Response) => {
    try {
      const colour = await ProductDetails.findAll();
      res.status(200).json(colour);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  //// lấy id
  getProductDetailsById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const colour = await ProductDetails.findByPk(id);
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

  createProductDetails: async (req: Request, res: Response) => {
    try {
      // Kiểm tra và lấy dữ liệu từ body của yêu cầu
      const SanPham = req.body?.SanPham;
      const Sizeid = req.body?.Size;
      console.log(Sizeid);
      const SoLuong = req.body?.SoLuong;
      const TrangThai = req.body?.TrangThai;
      const NgayTao = new Date();
      const NgayCapNhap = new Date();

      const sanpham = await Product.findByPk(SanPham);

      const size = await Size.findByPk(Sizeid);
      console.log(size);

      // Tạo màu mới trong cơ sở dữ liệu
      const oderdtails = await ProductDetails.create({
        SanPham: sanpham?.id,
        Size: size?.Ma,
        SoLuong,
        TrangThai,
        NgayTao,
        NgayCapNhap,
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
  updateProductDetails: async (req: Request, res: Response) => {
    console.log("updateProductDetails called");
    try {
      const { id } = req.params;
      console.log("id :", id);
      
      const { SanPham, Size, SoLuong, TrangThai, NgayTao, NgayCapNhap } = req.body;
  
      const productDetails = await ProductDetails.findByPk(id);
  
      if (productDetails) {
        await productDetails.update({
          SanPham,
          Size: Size, // Corrected typo
          SoLuong,
          TrangThai,
          NgayTao,
          NgayCapNhap,
        });
        res.status(200).json(productDetails);
      } else {
        res.status(404).json({ message: "Dòng sản phẩm không tìm thấy" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Xóa một thương hiệu
  deleteProductDetails: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const colour = await ProductDetails.findByPk(id);
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

export default ProductDetailsController;
