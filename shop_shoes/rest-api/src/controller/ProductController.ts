import {
  Product,
  Colour,
  ProductLine,
  Style,
  Material,
  Origin,
} from "../models/Product";
import { Request, Response } from "express";

const ProductController = {
  //  lấy tất cả sản phẩm cùng với thông tin con
  getProduct: async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Colour,
            as: "MauSacEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
            attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
          },
          {
            model: ProductLine,
            as: "DongSPEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
            attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
          },
          {
            model: Style,
            as: "KieuDangEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
            attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
          },
          {
            model: Material,
            as: "ChatLieuEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
            attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
          },
          {
            model: Origin,
            as: "XuatXuEXEC", // Đặt theo as đã được định nghĩa trong mối quan hệ belongsTo
            attributes: ["Ten"], // Chỉ lấy trường Tên từ bảng MauSac
          },
        ],
        attributes: [
          "id",
          "ten",
          "gianhap",
          "giaban",
          "mota",
          "ngaytao",
          "ngaycapnhat",
          "HienThi",
          "TrangThai",
        ],
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  getProductById: async (req: Request, res: Response) => {
    const { id } = req.params;

    console.log("ma:", id); // In ra giá trị của ma để kiểm tra
    try {
      const product = await Product.findByPk(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Colour not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Tạo một thương hiệu mới

  createProduct: async (req: Request, res: Response) => {
    try {
      const MauSacId = req.body?.MauSacId;
      const DongSPId = req.body?.DongSPId;
      const KieuDangId = req.body?.KieuDangId;
      const ChatLieuId = req.body?.ChatLieuId;
      const XuatXuId = req.body?.XuatXuId;
      //////////////////////////// /////////////////////
      const Ten = req.body?.Ten;
      const GiaNhap = req.body?.GiaNhap;
      const GiaBan = req.body?.GiaBan;
      const MoTa = req.body?.MoTa;
      const HienThi = req.body?.HienThi;
      const TrangThai = req.body?.TrangThai;
      ////////////////////////////////
      const NgayTao = new Date(); // Lấy ngày hiện tại
      const NgayCapNhat = new Date(); // Lấy ngày hiện tại
      const id = req.body?.id;

      console.log("NgayTao:", NgayTao);
      console.log("NgayCapNhat:", NgayCapNhat);

      const mauSac = MauSacId ? await Colour.findByPk(MauSacId) : undefined;
      const dongSP = DongSPId ? await ProductLine.findByPk(DongSPId) : undefined;
      const kieuDang = KieuDangId? await Style.findByPk(KieuDangId) : undefined;
      const chatLieu = ChatLieuId ? await Material.findByPk(ChatLieuId): undefined;
      const xuatXu = XuatXuId ? await Origin.findByPk(XuatXuId) : undefined;

      const dataFromClient = req.body;
      
      console.log("req.body:", dataFromClient);
      const productData: any = {
        Ten,
        GiaNhap,
        GiaBan,
        MoTa,
        NgayTao,
        NgayCapNhat,
        HienThi,
        TrangThai,
      };

      if (mauSac) {
        productData.MauSac = mauSac.Ten;
      }
      if (dongSP) {
        productData.DongSP = dongSP.Ten;
      }
      if (kieuDang) {
        productData.KieuDang = kieuDang.Ten;
      }
      if (chatLieu) {
        productData.ChatLieu = chatLieu.Ten;
      }
      if (xuatXu) {
        productData.XuatXu = xuatXu.Ten;
      }
    
      const product = await Product.create(productData, {
        include: [
          {
            model: Colour,
            as: "MauSacEXEC", // Đảm bảo sử dụng alias đúng
            where: { id: MauSacId },
            attributes: ["Ten"],
          },
          {
            model: ProductLine,
            as: "DongSPEXEC",
            where: { id: DongSPId },
            attributes: ["Ten"],
          },
          {
            model: Style,
            as: "KieuDangEXEC",
            where: { id: KieuDangId },
            attributes: ["Ten"],
          },
          {
            model: Material,
            as: "ChatLieuEXEC",
            where: { id: ChatLieuId },
            attributes: ["Ten"],
          },
          {
            model: Origin,
            as: "XuatXuEXEC",
            where: { id: XuatXuId },
            attributes: ["Ten"],
          },
        ],
      });

      // Trả về kết quả thành công
      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình tạo màu
      console.error("Error creating colour:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
  //  createColour : async (req: Request, res: Response) => {
  //   console.log('createColour called');
  //   try {
  //     const Ten = req.body.Ten;
  //     const NgayTao = req.body.NgayTao;
  //     const NgayCapNhat = req.body.NgayCapNhat;
  //     if (!Ten || !NgayTao || !NgayCapNhat) {
  //       return res.status(400).json({ message: 'Thiếu thông tin cần thiết trong yêu cầu' });
  //     }
  //     console.log('Request body:', req.body);
  //     const colour = await Colour.create({ Ten, NgayTao, NgayCapNhat });
  //     console.log('Colour created:', colour);
  //     res.status(201).json(colour);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: 'Lỗi nội bộ xảy ra trên server' });
  //   }
  // },

  // Cập nhật một thương hiệu
  updateProduct: async (req: Request, res: Response) => {
    try {
      const {
        id,
        MauSacId,
        DongSPId,
        KieuDangId,
        ChatLieuId,
        XuatXuId,
        Ten,
        GiaNhap,
        GiaBan,
        MoTa,
        NgayTao,
        HienThi,
        TrangThai,
      } = req.body;

      // Kiểm tra id sản phẩm cần cập nhật và các thuộc tính bắt buộc không được thiếu
      if (
        !id ||
        !MauSacId ||
        !DongSPId ||
        !KieuDangId ||
        !ChatLieuId ||
        !XuatXuId ||
        !Ten ||
        !GiaNhap ||
        !GiaBan ||
        !MoTa ||
        !NgayTao ||
        !HienThi ||
        !TrangThai
      ) {
        return res
          .status(400)
          .json({ message: "Thiếu thông tin cần thiết trong yêu cầu" });
      }

      // Tìm sản phẩm cần cập nhật trong cơ sở dữ liệu
      const existingProduct = await Product.findByPk(id);
      if (!existingProduct) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm cần cập nhật" });
      }

      // Tìm các đối tượng tương ứng từ cơ sở dữ liệu
      const mauSac = await Colour.findByPk(MauSacId);
      if (!mauSac) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy thông tin màu sắc" });
      }

      const dongSP = await ProductLine.findByPk(DongSPId);
      const kieuDang = await Style.findByPk(KieuDangId);
      const chatLieu = await Material.findByPk(ChatLieuId);
      const xuatXu = await Origin.findByPk(XuatXuId);

      // Kiểm tra xem các đối tượng khác đã được tìm thấy chưa
      if (!dongSP || !kieuDang || !chatLieu || !xuatXu) {
        return res.status(404).json({
          message:
            "Không tìm thấy thông tin dòng sản phẩm, kiểu dáng, chất liệu hoặc xuất xứ",
        });
      }

      // Cập nhật sản phẩm trong cơ sở dữ liệu
      await existingProduct.update({
        // MauSac: mauSac.id,
        // DongSP: dongSP.id,
        // KieuDang: kieuDang.id,
        // ChatLieu: chatLieu.id,
        // XuatXu: xuatXu.id,
        Ten,
        GiaNhap,
        GiaBan,
        MoTa,
        NgayTao,
        HienThi,
        TrangThai,
      });

      // Trả về kết quả thành công
      res.status(200).json({
        message: "Cập nhật sản phẩm thành công",
        product: existingProduct,
      });
    } catch (error) {
      // Xử lý lỗi nếu có lỗi xảy ra trong quá trình cập nhật sản phẩm
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },

  // Xóa một thương hiệu
  deleteProduct: async (req: Request, res: Response) => {
    console.log("createColour called");
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      console.log(product);
      console.log("createColour called");
      if (product) {
        await product.destroy();
        res.status(200).json({ message: "Dòng sản phầm đã được xóa" });
      } else {
        res.status(404).json({ message: "Dòng sản phầm không tìm thấy" });
      }
    } catch (error) {
      res.status(500).json({ message: "Lỗi nội bộ xảy ra trên server" });
    }
  },
};

export default ProductController;
