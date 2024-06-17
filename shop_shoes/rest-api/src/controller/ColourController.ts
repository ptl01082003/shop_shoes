import { Request, Response } from 'express';
import Colour from '../models/Colour';

// Lấy danh sách tất cả các thương hiệu
export const getColour = async (req: Request, res: Response) => {
  try {
    const colour = await Colour.findAll();
    res.status(200).json(colour);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Tạo một thương hiệu mới
export const createColour = async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const colour = await Colour.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(colour);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Cập nhật một thương hiệu
export const updateColour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const colour = await Colour.findByPk(id);
    if (colour) {
      await colour.update({ Ten, NgayTao, NgayCapNhat });
      res.status(200).json(colour);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Xóa một thương hiệu
export const deleteColour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const colour = await Colour.findByPk(id);
    if (colour) {
      await colour.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};
