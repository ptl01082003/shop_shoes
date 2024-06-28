import { Request, Response } from "express";
import Comment from "../models/Comment";
import OrderDetails from "../models/OrderDetails";

const CommentController = {
  getComment: async (req: Request, res: Response) => {
    try {
      const colour = await Comment.findAll();
      res.status(200).json(colour);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  //// lấy id
  getCommentById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const colour = await Comment.findByPk(id);
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

  createComment: async (req: Request, res: Response) => {
    try {
      // Kiểm tra và lấy dữ liệu từ body của yêu cầu
      const Rating = req.body?.Rating;
      const TieuDe = req.body?.TieuDe;
      const NoiDung = req.body?.NoiDung;
      const ThoiGian = req.body?.ThoiGian;
      const ChiTietDonHang = req.body?.ChiTietDonHang;
      const PheDuyet = req.body?.PheDuyet;
      const DaChinhSua = req.body?.DaChinhSua;
     
      const chitietDonHang = await OrderDetails.findByPk(ChiTietDonHang);

      // Kiểm tra nếu không tìm thấy sản phẩm
      if (!chitietDonHang) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }

      // Tạo hình ảnh mới và liên kết với sản phẩm đã tìm thấy
      const newImage = await Comment.create({
       Rating, TieuDe,NoiDung,ThoiGian,ChiTietDonHang,PheDuyet,DaChinhSua // Sử dụng sanPham.id để liên kết với sản phẩm
      });


      // Trả về kết quả thành công
      res.status(201).json(newImage);
    } catch (error) {
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình tạo màu
      console.error("Error creating colour:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Cập nhật một thương hiệu
  updateComment: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params; // Lấy id từ tham số URL
      const Rating = req.body?.Rating;
      const TieuDe = req.body?.TieuDe;
      const NoiDung = req.body?.NoiDung;
      const ThoiGian = req.body?.ThoiGian;
      const ChiTietDonHang = req.body?.ChiTietDonHang;
      const PheDuyet = req.body?.PheDuyet;
      const DaChinhSua = req.body?.DaChinhSua; // Lấy các trường cần cập nhật từ req.body

      // Tìm hình ảnh dựa trên id
      const image = await Comment.findByPk(id);

      // Kiểm tra nếu không tìm thấy hình ảnh
      if (!image) {
        return res.status(404).json({ message: "Hình ảnh không tồn tại" });
      }

      // Cập nhật thông tin hình ảnh nếu có các trường cần cập nhật
      if (Rating) {
        image.Rating = Rating;
      }
      if (TieuDe) {
        image.TieuDe = TieuDe;
      }
      if (NoiDung) {
        image.noidung = NoiDung;
      }
      if (ThoiGian) {
        image.thoigian = ThoiGian;
      }
      if (ChiTietDonHang) {
        image.chiTietDonHang = ChiTietDonHang;
      }
      if (PheDuyet) {
        image.pheDuyet = PheDuyet;
      }
      if (DaChinhSua) {
        image.daChinhSua = DaChinhSua;
      }
      // Lưu các thay đổi vào cơ sở dữ liệu
      await image.save();

      // Trả về thông tin hình ảnh đã cập nhật
      res.status(200).json(image);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Xóa một thương hiệu
  deleteComment: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const colour = await Comment.findByPk(id);
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

export default CommentController;
