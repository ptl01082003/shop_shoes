import { Request, Response } from 'express';
import Voucher from '../models/Voucher';
import CustomerVouchers from '../models/CustomerVouchers';

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
  
  try {
    const { Voucher, KhachHang } = req.params;

    // Tìm kiếm CustomerVoucher dựa trên Voucher và KhachHang
    const customerVoucher = await CustomerVouchers.findOne({
      where: {
        Voucher,
        KhachHang,
      },
    });

    if (customerVoucher) {
      // Trả về Voucher và KhachHang
      res.status(200).json({
        Voucher: customerVoucher.Voucher,
        KhachHang: customerVoucher.KhachHang,
      });
    } else {
      res.status(404).json({ message: "Customer voucher không tồn tại" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
  }
},


// Tạo một thương hiệu mới
createVoucher: async (req: Request, res: Response) => {
  try {
    const {
      Ma,
      MoTa,
      LoaiMucGiam,
      MucGiam,
      GiaTriDonHang,
      MucGiamToiDa,
      NgayBatDau,
      NgayKetThuc,
      SoLuong,
      TrangThaiXoa,
      HinhThucThanhToan,
      TrangThai,
      DoiTuongSuDung
    } = req.body;

    const voucher = await Voucher.create({
      Ma,
      MoTa,
      LoaiMucGiam,
      MucGiam,
      GiaTriDonHang,
      MucGiamToiDa,
      NgayBatDau,
      NgayKetThuc,
      SoLuong,
      TrangThaiXoa,
      HinhThucThanhToan,
      TrangThai,
      DoiTuongSuDung
    });

    res.status(201).json(voucher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
  }
},



// Cập nhật một thương hiệu
updateVoucher: async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      MoTa,
      LoaiMucGiam,
      MucGiam,
      GiaTriDonHang,
      MucGiamToiDa,
      NgayBatDau,
      NgayKetThuc,
      SoLuong,
      TrangThaiXoa,
      HinhThucThanhToan,
      TrangThai,
      DoiTuongSuDung
    } = req.body;

    const voucher = await Voucher.findByPk(id);

    if (voucher) {
      await voucher.update({
        MoTa,
        LoaiMucGiam,
        MucGiam,
        GiaTriDonHang,
        MucGiamToiDa,
        NgayBatDau,
        NgayKetThuc,
        SoLuong,
        TrangThaiXoa,
        HinhThucThanhToan,
        TrangThai,
        DoiTuongSuDung
      });

      res.status(200).json(voucher);
    } else {
      res.status(404).json({ message: "Voucher không tìm thấy" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
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