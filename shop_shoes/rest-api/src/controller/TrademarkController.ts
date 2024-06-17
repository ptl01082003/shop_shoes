import { Request, Response } from 'express';
import Trademark from '../models/Trademark';

// Lấy danh sách tất cả các thương hiệu
export const getTrademark = async (req: Request, res: Response) => {
  try {
    const trademark = await Trademark.findAll({
        attributes: ['id', 'Ten', 'NgayTao', 'NgayCapNhat'], // Chỉ lấy các trường cần thiết
      });
    res.status(200).json(trademark);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Tạo một thương hiệu mới
export const createTrademark = async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const trademark = await Trademark.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(trademark);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Cập nhật một thương hiệu
export const updateTrademark = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const trademark = await Trademark.findByPk(id);
    if (trademark) {
      await trademark.update({ Ten, NgayTao, NgayCapNhat });
      res.status(200).json(trademark);
    } else {
      res.status(404).json({ message: 'Thương hiệu không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Xóa một thương hiệu
export const deleteTrademark = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trademark = await Trademark.findByPk(id);
    if (trademark) {
      await trademark.destroy();
      res.status(200).json({ message: 'Thương hiệu đã được xóa' });
    } else {
      res.status(404).json({ message: 'Thương hiệu không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};
