import { Request, Response } from 'express';
import ThuongHieu from '../models/ThuongHieu';

// Lấy danh sách tất cả các thương hiệu
export const getThuongHieu = async (req: Request, res: Response) => {
  try {
    const thuonghieu = await ThuongHieu.findAll({
        attributes: ['id', 'Ten', 'NgayTao', 'NgayCapNhat'], // Chỉ lấy các trường cần thiết
      });
    res.status(200).json(thuonghieu);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Tạo một thương hiệu mới
export const createThuongHieu = async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const thuonghieu = await ThuongHieu.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(thuonghieu);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Cập nhật một thương hiệu
export const updateThuongHieu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const thuonghieu = await ThuongHieu.findByPk(id);
    if (thuonghieu) {
      await thuonghieu.update({ Ten, NgayTao, NgayCapNhat });
      res.status(200).json(thuonghieu);
    } else {
      res.status(404).json({ message: 'Thương hiệu không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Xóa một thương hiệu
export const deleteThuongHieu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const thuonghieu = await ThuongHieu.findByPk(id);
    if (thuonghieu) {
      await thuonghieu.destroy();
      res.status(200).json({ message: 'Thương hiệu đã được xóa' });
    } else {
      res.status(404).json({ message: 'Thương hiệu không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};
