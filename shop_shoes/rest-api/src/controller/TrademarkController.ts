import { Request, Response } from 'express';
import Trademark from '../models/Trademark';

const TrademarkController ={
// Lấy danh sách tất cả các thương hiệu
 getTrademark : async (req: Request, res: Response) => {
  try {
    const trademark = await Trademark.findAll({
        attributes: ['id', 'Ten', 'NgayTao', 'NgayCapNhat'], // Chỉ lấy các trường cần thiết
      });
    res.status(200).json(trademark);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

getTrademarkById: async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("ma:", id); // In ra giá trị của ma để kiểm tra
  try {
    const trademark = await Trademark.findByPk(id);
    if (trademark) {
      res.status(200).json(trademark);
    } else {
      res.status(404).json({ error: "Colour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
  }
},

// Tạo một thương hiệu mới

 createTrademark : async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const trademark = await Trademark.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(trademark);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

// Cập nhật một thương hiệu
 updateTrademark : async (req: Request, res: Response) => {
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
},

// Xóa một thương hiệu
 deleteTrademark : async (req: Request, res: Response) => {
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
},
}

export default TrademarkController;
