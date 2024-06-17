import { Request, Response } from 'express';
import DongSP from '../models/ProductLine';
import ProductLine from '../models/ProductLine';

// Lấy danh sách tất cả các thương hiệu
export const getProductLine = async (req: Request, res: Response) => {
  try {
    const productLine = await ProductLine.findAll({
      include: [
        {
          model: ProductLine,
          as: "ThuongHieuEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
          attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
        },
        
      ],
      attributes: ["Ten","NgayTao","NgayCapNhat"],
     
    });
    res.status(200).json(productLine);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Tạo một thương hiệu mới
export const createProductLine = async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat,ThuongHieuId } = req.body;
    const productLine = await ProductLine.create({ Ten, NgayTao, NgayCapNhat ,ThuongHieuId});
    res.status(201).json(productLine);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Cập nhật một thương hiệu
export const updateProductLine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat,ThuongHieuId } = req.body;
    const productLine = await ProductLine.findByPk(id);
    if (productLine) {
      await productLine.update({ Ten, NgayTao, NgayCapNhat ,ThuongHieuId});
      res.status(200).json(productLine);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Xóa một thương hiệu
export const deleteProductLine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productLine = await ProductLine.findByPk(id);
    if (productLine) {
      await productLine.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};
