import { Request, Response } from 'express';
import Material from '../models/Material';

// Lấy danh sách tất cả các thương hiệu
export const getMaterial = async (req: Request, res: Response) => {
  try {
    const material = await Material.findAll();
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Tạo một thương hiệu mới
export const createMaterial = async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const material = await Material.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Cập nhật một thương hiệu
export const updateMaterial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const material = await Material.findByPk(id);
    if (material) {
      await material.update({ Ten, NgayTao, NgayCapNhat });
      res.status(200).json(material);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Xóa một thương hiệu
export const deleteMaterial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const material = await Material.findByPk(id);
    if (material) {
      await material.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};
