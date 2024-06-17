import { Product, Colour, ProductLine, Style, Material, Origin } from "../models/Product";
import { Request, Response } from 'express';

//  lấy tất cả sản phẩm cùng với thông tin con
export const getProduct = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            include: [
              {
                model: Colour,
                as: "MauSacEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
                attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
              },
              {
                model: ProductLine,
                as: "DongSPEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
                attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
              },
              {
                model: Style,
                as: "KieuDangEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
                attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
              },
              {
                model: Material,
                as: "ChatLieuEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
                attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
              },
              {
                model: Origin,
                as: "XuatXuEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
                attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
              },
            ],
            attributes: ["ten","gianhap","giaban","mota","ngaytao","ngaycapnhat","HienThi","TrangThai"],
           
          });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
    }
  };



