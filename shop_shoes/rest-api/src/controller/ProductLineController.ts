import { Request, Response } from 'express';

import ProductLine from '../models/ProductLine';
import Trademark from '../models/Trademark';
const ProductLineController = {
// Lấy danh sách tất cả các thương hiệu
  getProductLine : async (req: Request, res: Response) => {
  try {
    const productLine = await ProductLine.findAll({
      include: [
        {
          model: Trademark,
          as: "ThuongHieuEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
          attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
        },
     
      ],
      attributes: ["id","ten","ngaytao","ngaycapnhat"],
     
    });
    res.status(200).json(productLine);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},
getProductLineById: async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("ma:", id); // In ra giá trị của ma để kiểm tra
  try {
    const productLine = await ProductLine.findByPk(id);
    if (productLine) {
      res.status(200).json(productLine);
    } else {
      res.status(404).json({ error: "Colour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
  }
},



// Tạo một thương hiệu mới
  createProductLine : async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat,ThuongHieuId } = req.body;
    const productLine = await ProductLine.create({Ten, NgayTao, NgayCapNhat,ThuongHieuId  });
    res.status(201).json(productLine);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

// Cập nhật một thương hiệu
  updateProductLine : async (req: Request, res: Response) => {
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
},

// Xóa một thương hiệu
 deleteProductLine : async (req: Request, res: Response) => {
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
}
}
export default ProductLineController;