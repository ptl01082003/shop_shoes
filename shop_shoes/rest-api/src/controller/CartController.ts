import Cart from "../models/Cart";
import { Request, Response } from "express";
import Customer from "../models/Customer";
import ProductDetails from "../models/ProductDetails";

const CartController = {
  //  Lấy tất cả sản phẩm cùng với thông tin con
  getCart: async (req: Request, res: Response) => {
    try {
      const address = await Cart.findAll({});
      res.status(200).json(address);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  getCartById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const address = await Cart.findByPk(id);
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

 createCart: async (req: Request, res: Response) => {
  try {
    const { ChiTietSanPham, KhachHang, SoLuong } = req.body;

    const khachhang = await Customer.findByPk(KhachHang);
    const ctsp = await ProductDetails.findByPk(ChiTietSanPham);

    // Tạo giỏ hàng mới trong cơ sở dữ liệu
    const cart = await Cart.create({
      ChiTietSanPham: ctsp?.id,
      KhachHang: khachhang?.UserName,
      SoLuong,
    });

    // Trả về kết quả thành công
    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
    // Xử lý lỗi nếu có lỗi xảy ra trong quá trình tạo giỏ hàng
    console.error("Error creating cart:", error);
    res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
  }
},

  // Cập nhật một thương hiệu
  updateCart: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { ChiTietSanPham, KhachHang, SoLuong } = req.body;
  
      const cart = await Cart.findByPk(id);
  
      if (cart) {
        await cart.update({
          ChiTietSanPham,
          KhachHang,
          SoLuong,
        });
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: "Giỏ hàng không tìm thấy" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  

  // Xóa một thương hiệu
  deleteCart: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const address = await Cart.findByPk(id);
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

export default CartController;
