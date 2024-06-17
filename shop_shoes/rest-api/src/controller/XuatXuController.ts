import { Request, Response } from 'express';
import XuatXu from '../models/XuatXu';


// Lấy danh sách tất cả các thương hiệu
export const getXuatXu = async (req: Request, res: Response) => {
  try {
    const xuatxu = await XuatXu.findAll();
    res.status(200).json(xuatxu);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Tạo một thương hiệu mới
export const createXuatXu = async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const xuatxu = await XuatXu.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(xuatxu);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Cập nhật một thương hiệu
export const updateXuatXu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const xuatxu = await XuatXu.findByPk(id);
    if (xuatxu) {
      await xuatxu.update({ Ten, NgayTao, NgayCapNhat });
      res.status(200).json(xuatxu);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Xóa một thương hiệu
export const deleteXuatXu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const xuatxu = await XuatXu.findByPk(id);
    if (xuatxu) {
      await xuatxu.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};
