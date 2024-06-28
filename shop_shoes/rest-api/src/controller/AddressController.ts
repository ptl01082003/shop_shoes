import Address from "../models/Address";
import { Request, Response } from "express";
import Customer from "../models/Customer";

const AddressController = {
  //  Lấy tất cả sản phẩm cùng với thông tin con
  getAddress: async (req: Request, res: Response) => {
    try {
      const address = await Address.findAll({});
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  getAddressById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const address = await Address.findByPk(id);
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

  createAddress: async (req: Request, res: Response) => {
    try {
      const KhachHang = req.body.KhachHang;
      const ThanhPhoCode = req.body.ThanhPhoCode;
      const QuanHuyenCode = req.body.QuanHuyenCode;
      const XaPhuongCode = req.body.XaPhuongCode;
      const DiaChiChiTiet = req.body.DiaChiChiTiet;
      const ThanhPhoName = req.body.ThanhPhoName;
      const QuyenHuyenName = req.body.QuyenHuyenName;
      const XaPhuongName = req.body.XaPhuongName;
      const Email = req.body.Email;
      const SoDienThoai = req.body.SoDienThoai;
      const TenNguoiNhan = req.body.TenNguoiNhan;
      const MacDinh = req.body.MacDinh;
      const dataFromClient = req.body;

      console.log("req.body:", dataFromClient);

      const khachHang = await Customer.findByPk(KhachHang);

      const address = await Address.create({
        KhachHang: khachHang?.UserName,
        ThanhPhoCode,
        QuanHuyenCode,
        XaPhuongCode,
        DiaChiChiTiet,
        ThanhPhoName,
        QuyenHuyenName,
        XaPhuongName,
        Email,
        SoDienThoai,
        TenNguoiNhan,
        MacDinh,
      });

      // Trả về kết quả thành công
      res.status(201).json(address);
    } catch (error) {
      console.log(error);
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình tạo màu
      console.error("Error creating colour:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Cập nhật một thương hiệu
  updateAddress: async (req: Request, res: Response) => {
    try {
      // Kiểm tra id sản phẩm cần cập nhật và các thuộc tính bắt buộc không được thiếu
      // if (
      //   !id ||
      //   !MauSacId ||
      //   !DongSPId ||
      //   !KieuDangId ||
      //   !ChatLieuId ||
      //   !XuatXuId ||
      //   !Ten ||
      //   !GiaNhap ||
      //   !GiaBan ||
      //   !MoTa ||
      //   !NgayTao ||
      //   !HienThi ||
      //   !TrangThai
      // ) {
      //   return res
      //     .status(400)
      //     .json({ message: "Thiếu thông tin cần thiết trong yêu cầu" });
      // }

      // Tìm sản phẩm cần cập nhật trong cơ sở dữ liệu
      // Tìm các đối tượng tương ứng từ cơ sở dữ liệu
      const KhachHang = req.body.KhachHang;
      const ThanhPhoCode = req.body.ThanhPhoCode;
      const QuanHuyenCode = req.body.QuanHuyenCode;
      const XaPhuongCode = req.body.XaPhuongCode;
      const DiaChiChiTiet = req.body.DiaChiChiTiet;
      const ThanhPhoName = req.body.ThanhPhoName;
      const QuyenHuyenName = req.body.QuyenHuyenName;
      const XaPhuongName = req.body.XaPhuongName;
      const Email = req.body.Email;
      const SoDienThoai = req.body.SoDienThoai;
      const TenNguoiNhan = req.body.TenNguoiNhan;
      const MacDinh = req.body.MacDinh;

      const dataFromClient = req.body;
      const { id } = req.params;
      const address = await Address.findByPk(id);
      if (!address) {
        return res.status(404).json({ message: "Địa chỉ không tồn tại" });
      }
      const khachHang = await Customer.findByPk(KhachHang);

      // Kiểm tra xem các đối tượng khác đã được tìm thấy chưa
      if (!KhachHang) {
        return res.status(404).json({
          message: "Không tìm thấy thông tin dòng Khách Hàng",
        });
      }
      if (KhachHang) {
        address.KhachHang = KhachHang;
      }
      if (ThanhPhoCode) {
        address.ThanhPhoCode = ThanhPhoCode;
      }
      if (QuanHuyenCode) {
        address.QuanHuyenCode = QuanHuyenCode;
      }
      if (XaPhuongCode) {
        address.XaPhuongCode = XaPhuongCode;
      }
      if (DiaChiChiTiet) {
        address.DiaChiChiTiet = DiaChiChiTiet;
      }
      if (ThanhPhoName) {
        address.ThanhPhoName = ThanhPhoName;
      }
      if (QuyenHuyenName) {
        address.QuyenHuyenName = QuyenHuyenName;
      }
      if (XaPhuongName) {
        address.XaPhuongName = XaPhuongName;
      }
      if (Email) {
        address.Email = Email;
      }
      if (SoDienThoai) {
        address.SoDienThoai = SoDienThoai;
      }
      if (TenNguoiNhan) {
        address.TenNguoiNhan = TenNguoiNhan;
      }
      if (MacDinh) {
        address.MacDinh = MacDinh;
      }

      // Cập nhật sản phẩm trong cơ sở dữ liệu
      await address.save();
      // Trả về kết quả thành công
    } catch (error) {
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình cập nhật sản phẩm
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Xóa một thương hiệu
  deleteAddress: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const address = await Address.findByPk(id);
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

export default AddressController;
