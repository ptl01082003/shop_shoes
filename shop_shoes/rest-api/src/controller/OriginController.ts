import { Request, Response } from 'express';
import Origin from '../models/Origin';

const OriginController = {
// Lấy danh sách tất cả các thương hiệu
 getOrigin : async (req: Request, res: Response) => {
  try {
    const origin = await Origin.findAll();
    res.status(200).json(origin);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

// Tạo một thương hiệu mới
 createOrigin : async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const origin = await Origin.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(origin);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

// Cập nhật một thương hiệu
 updateOrigin : async (req: Request, res: Response) => {
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
},

// Xóa một thương hiệu
 deleteOrigin : async (req: Request, res: Response) => {
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
},
}

export default OriginController;