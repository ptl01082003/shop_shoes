import { Request, Response } from 'express';
import Voucher from '../models/Voucher';

const VoucherController = {  
// Lấy danh sách tất cả các thương hiệu
 getVoucher : async (req: Request, res: Response) => {
  try {
    const voucher = await Voucher.findAll();
    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

getVoucherById: async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("ma:", id); // In ra giá trị của ma để kiểm tra
  try {
    const voucher = await Voucher.findByPk(id);
    if (voucher) {
      res.status(200).json(voucher);
    } else {
      res.status(404).json({ error: "Colour not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
  }
},


// Tạo một thương hiệu mới
 createVoucher : async (req: Request, res: Response) => {
  try {
    const { Ma,Ten } = req.body;
    const voucher = await Voucher.create();
    res.status(201).json(voucher);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},


// Cập nhật một thương hiệu
 updateVoucher : async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Ten} = req.body;
    const voucher = await Voucher.findByPk(id);
    if (voucher) {
      await voucher.update({ });
      res.status(200).json(voucher);
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

// Xóa một thương hiệu
 deleteVoucher : async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const voucher = await Voucher.findByPk(id);
    if (voucher) {
      await voucher.destroy();
      res.status(200).json({ message: 'Dòng sản phầm đã được xóa' });
    } else {
      res.status(404).json({ message: 'Dòng sản phầm không tìm thấy' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  }
},

}

export default VoucherController;