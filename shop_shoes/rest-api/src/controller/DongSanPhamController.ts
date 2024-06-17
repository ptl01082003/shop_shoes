import { Request, Response } from 'express';
import DongSP from '../models/DongSanPham';

// Lấy danh sách tất cả các thương hiệu
export const getDongSP = async (req: Request, res: Response) => {
  try {
    const dongsp = await DongSP.findAll();
    res.status(200).json(dongsp);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Tạo một thương hiệu mới
export const createDongSP = async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat,ThuongHieuId } = req.body;
    const dongsp = await DongSP.create({ Ten, NgayTao, NgayCapNhat ,ThuongHieuId});
    res.status(201).json(dongsp);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Cập nhật một thương hiệu
export const updateDongSP = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat,ThuongHieuId } = req.body;
    const dongsp = await DongSP.findByPk(id);
    if (dongsp) {
      await dongsp.update({ Ten, NgayTao, NgayCapNhat ,ThuongHieuId});
      res.status(200).json(dongsp);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Xóa một thương hiệu
export const deleteDongSP = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dongsp = await DongSP.findByPk(id);
    if (dongsp) {
      await dongsp.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};
