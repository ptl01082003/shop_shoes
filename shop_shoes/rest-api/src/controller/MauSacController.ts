import { Request, Response } from 'express';
import MauSac from '../models/MauSac';

// Lấy danh sách tất cả các thương hiệu
export const getMauSac = async (req: Request, res: Response) => {
  try {
    const mausac = await MauSac.findAll();
    res.status(200).json(mausac);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Tạo một thương hiệu mới
export const createMauSac = async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const mausac = await MauSac.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(mausac);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Cập nhật một thương hiệu
export const updateMauSac = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const mausac = await MauSac.findByPk(id);
    if (mausac) {
      await mausac.update({ Ten, NgayTao, NgayCapNhat });
      res.status(200).json(mausac);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Xóa một thương hiệu
export const deleteMauSac = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mausac = await MauSac.findByPk(id);
    if (mausac) {
      await mausac.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};
