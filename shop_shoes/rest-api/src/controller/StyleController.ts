import { Request, Response } from 'express';
import Style from '../models/Style';

const StyleController = {  
// Lấy danh sách tất cả các thương hiệu
 getStyle : async (req: Request, res: Response) => {
  try {
    const style = await Style.findAll();
    res.status(200).json(style);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

// Tạo một thương hiệu mới
 createStyle : async (req: Request, res: Response) => {
  try {
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const style = await Style.create({ Ten, NgayTao, NgayCapNhat });
    res.status(201).json(style);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

// Cập nhật một thương hiệu
 updateStyle : async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten, NgayTao, NgayCapNhat } = req.body;
    const style = await Style.findByPk(id);
    if (style) {
      await style.update({ Ten, NgayTao, NgayCapNhat });
      res.status(200).json(style);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

// Xóa một thương hiệu
 deleteStyle : async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const style = await Style.findByPk(id);
    if (style) {
      await style.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

}

export default StyleController;