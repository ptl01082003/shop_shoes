import { Request, Response } from 'express';
import KieuDang from '../models/KieuDang';

// Lấy danh sách tất cả các thương hiệu
export const getKieuDang = async (req: Request, res: Response) => {
  try {
    const kieudang = await KieuDang.findAll();
    res.status(200).json(kieudang);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Tạo một thương hiệu mới
export const createKieuDang = async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const kieudang = await KieuDang.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(kieudang);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Cập nhật một thương hiệu
export const updateKieuDang = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const kieudang = await KieuDang.findByPk(id);
    if (kieudang) {
      await kieudang.update({ Ten, NgayTao, NgayCapNhat });
      res.status(200).json(kieudang);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Xóa một thương hiệu
export const deleteKieuDang = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const kieudang = await KieuDang.findByPk(id);
    if (kieudang) {
      await kieudang.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};
