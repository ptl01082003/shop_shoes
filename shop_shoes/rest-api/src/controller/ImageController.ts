import { Request, Response } from "express";
import Image from "../models/Image";
import { Product } from "../models/Product";

const ImageController = {
  getImage: async (req: Request, res: Response) => {
    try {
      const colour = await Image.findAll();
      res.status(200).json(colour);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  //// lấy id
  getImageById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const colour = await Image.findByPk(id);
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
  createImage: async (req: Request, res: Response) => {
    try {
      const { SanPham, Ten, ViTriAnh } = req.body;

      // Tìm sản phẩm với primary key là SanPham (giả sử SanPham là khóa chính của Product)
      const sanPham = await Product.findByPk(SanPham);

      // Kiểm tra nếu không tìm thấy sản phẩm
      if (!sanPham) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }

      // Tạo hình ảnh mới và liên kết với sản phẩm đã tìm thấy
      const newImage = await Image.create({
        Ten,
        ViTriAnh,
        SanPham: sanPham.id, // Sử dụng sanPham.id để liên kết với sản phẩm
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
  updateImage: async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // Lấy id từ tham số URL
      const { SanPham, Ten, ViTriAnh } = req.body; // Lấy các trường cần cập nhật từ req.body

      // Tìm hình ảnh dựa trên id
      const image = await Image.findByPk(id);

      // Kiểm tra nếu không tìm thấy hình ảnh
      if (!image) {
        return res.status(404).json({ message: "Hình ảnh không tồn tại" });
      }

      // Cập nhật thông tin hình ảnh nếu có các trường cần cập nhật
      if (Ten) {
        image.Ten = Ten;
      }
      if (SanPham) {
        image.SanPham = SanPham;
      }
      if (ViTriAnh) {
        image.ViTriAnh = ViTriAnh;
      }

      // Lưu các thay đổi vào cơ sở dữ liệu
      await image.save();

      // Trả về thông tin hình ảnh đã cập nhật
      res.status(200).json(image);
    } catch (error) {
      console.error("Error updating image:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Xóa một thương hiệu
  deleteImage: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const colour = await Image.findByPk(id);
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

export default ImageController;
