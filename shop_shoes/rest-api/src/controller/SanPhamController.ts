import { SanPham, MauSac, DongSP, KieuDang, ChatLieu, XuatXu } from "../models/SanPham";
import { Request, Response } from 'express';

//  lấy tất cả sản phẩm cùng với thông tin con
export const getSanPham = async (req: Request, res: Response) => {
    try {
        const sanPhams = await SanPham.findAll({
            include: [
              {
                model: MauSac,
                as: "MauSacEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
                attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
              },
              {
                model: DongSP,
                as: "DongSPEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
                attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
              },
              {
                model: KieuDang,
                as: "KieuDangEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
                attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
              },
              {
                model: ChatLieu,
                as: "ChatLieuEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
                attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
              },
              {
                model: XuatXu,
                as: "XuatXuEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
                attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
              },
            ],
            attributes: ["ten","gianhap","giaban","mota","ngaytao","ngaycapnhat","HienThi","TrangThai"],
           
          });
      res.status(200).json(sanPhams);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
    }
  };



