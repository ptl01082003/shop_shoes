
import Order from "../models/Order"; 
import { Request, Response } from "express";


const OrderController = {
  //  Lấy tất cả sản phẩm cùng với thông tin con
  getOrder: async (req: Request, res: Response) => {
    try {
      const address = await Order.findAll({
      });
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  getOrderById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const address = await Order.findByPk(id);
      if (address) {
        res.status(200).json(address);
      } else {
        res.status(404).json({ error: "Colour not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Tạo một thương hiệu mới

  createOrder: async (req: Request, res: Response) => {
    try {
      const {
        Ma,
        KhachHang,
        Voucher,
        TenNguoiNhan,
        SoDienThoai,
        Email,
        ThanhPho_Name,
        ThanhPho_Code,
        QuanHuyen_Name,
        QuanHuyen_Code,
        XaPhuong_Name,
        XaPhuong_Code,
        DiaChiChiTiet,
        NgayDatHang,
        TrangThai,
        GhiChu,
        TienGiam,
        PhiGiaoHang,
        PhuongThucThanhToan,
        LyDoHuy,
        maGiaoDich,
        NgayXacNhan,
        NgayGiaoHang,
        NgayHoanThanh,
        NgayHuy,
        Loai,
        NhanVien,
      } = req.body;
  
      const order = await Order.create({
        Ma,
        KhachHang,
        Voucher,
        TenNguoiNhan,
        SoDienThoai,
        Email,
        ThanhPho_Name,
        ThanhPho_Code,
        QuanHuyen_Name,
        QuanHuyen_Code,
        XaPhuong_Name,
        XaPhuong_Code,
        DiaChiChiTiet,
        NgayDatHang,
        TrangThai,
        GhiChu,
        TienGiam,
        PhiGiaoHang,
        PhuongThucThanhToan,
        LyDoHuy,
        maGiaoDich,
        NgayXacNhan,
        NgayGiaoHang,
        NgayHoanThanh,
        NgayHuy,
        Loai,
        NhanVien,
      });
  
      res.status(201).json(order);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  
  // Cập nhật một thương hiệu
  updateOrder: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        KhachHang,
        Voucher,
        TenNguoiNhan,
        SoDienThoai,
        Email,
        ThanhPho_Name,
        ThanhPho_Code,
        QuanHuyen_Name,
        QuanHuyen_Code,
        XaPhuong_Name,
        XaPhuong_Code,
        DiaChiChiTiet,
        NgayDatHang,
        TrangThai,
        GhiChu,
        TienGiam,
        PhiGiaoHang,
        PhuongThucThanhToan,
        LyDoHuy,
        maGiaoDich,
        NgayXacNhan,
        NgayGiaoHang,
        NgayHoanThanh,
        NgayHuy,
        Loai,
        NhanVien,
      } = req.body;
  
      const order = await Order.findByPk(id);
  
      if (order) {
        await order.update({
          KhachHang,
          Voucher,
          TenNguoiNhan,
          SoDienThoai,
          Email,
          ThanhPho_Name,
          ThanhPho_Code,
          QuanHuyen_Name,
          QuanHuyen_Code,
          XaPhuong_Name,
          XaPhuong_Code,
          DiaChiChiTiet,
          NgayDatHang,
          TrangThai,
          GhiChu,
          TienGiam,
          PhiGiaoHang,
          PhuongThucThanhToan,
          LyDoHuy,
          maGiaoDich,
          NgayXacNhan,
          NgayGiaoHang,
          NgayHoanThanh,
          NgayHuy,
          Loai,
          NhanVien,
        });
  
        res.status(200).json(order);
      } else {
        res.status(404).json({ message: "Đơn hàng không tìm thấy" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  

  // Xóa một thương hiệu
  deleteOrder: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const address = await Order.findByPk(id);
      console.log(address);
      console.log("createColour called");
      if (address) {
        await address.destroy();
        res.status(200).json({ message: "Dòng sản phầm đã được xóa" });
      } else {
        res.status(404).json({ message: "Dòng sản phầm không tìm thấy" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
};

export default OrderController;
