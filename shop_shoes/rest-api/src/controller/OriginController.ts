import { Request, Response } from 'express';
import Origin from '../models/Origin';


// Lấy danh sách tất cả các thương hiệu
export const getOrigin = async (req: Request, res: Response) => {
  try {
    const origin = await Origin.findAll();
    res.status(200).json(origin);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Tạo một thương hiệu mới
export const createOrigin = async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const origin = await Origin.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(origin);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Cập nhật một thương hiệu
export const updateOrigin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const origin = await Origin.findByPk(id);
    if (origin) {
      await origin.update({ Ten, NgayTao, NgayCapNhat });
      res.status(200).json(origin);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Xóa một thương hiệu
export const deleteOrigin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const origin = await Origin.findByPk(id);
    if (origin) {
      await origin.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};
