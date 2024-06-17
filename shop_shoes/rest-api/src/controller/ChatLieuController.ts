import { Request, Response } from 'express';
import ChatLieu from '../models/ChatLieu';

// Lấy danh sách tất cả các thương hiệu
export const getChatLieu = async (req: Request, res: Response) => {
  try {
    const chatlieu = await ChatLieu.findAll();
    res.status(200).json(chatlieu);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Tạo một thương hiệu mới
export const createChatLieu = async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const chatlieu = await ChatLieu.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(chatlieu);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Cập nhật một thương hiệu
export const updateChatLieu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const chatlieu = await ChatLieu.findByPk(id);
    if (chatlieu) {
      await chatlieu.update({ Ten, NgayTao, NgayCapNhat });
      res.status(200).json(chatlieu);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};

// Xóa một thương hiệu
export const deleteChatLieu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chatlieu = await ChatLieu.findByPk(id);
    if (chatlieu) {
      await chatlieu.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
};
