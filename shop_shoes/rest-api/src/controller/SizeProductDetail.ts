// controllers/SizeProductDetailsController.ts
import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { SizeProductDetails } from "../models/SizeProductDetails";
import { Sizes } from "../models/Sizes";
import { ProductDetails } from "../models/ProductDetails";

const SizeProductDetailsController = {
  addSizeProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { sizeId, productDetailId, quantity } = req.body;

      const sizeProductDetail = await SizeProductDetails.create({
        sizeId,
        productDetailId,
        quantity,
      });

      res.status(201).json({
        message: "Thêm chi tiết kích thước sản phẩm thành công",
        code: 0,
        data: sizeProductDetail,
      });
    } catch (error) {
      console.error(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thêm chi tiết kích thước sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  getSizeProductDetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { sizeProductDetailId, sizeId, productDetailId } = req.query;
      const whereClause: any = {};

      if (sizeProductDetailId) {
        whereClause.sizeProductDetailId = sizeProductDetailId;
      }
      if (sizeId) {
        whereClause.sizeId = sizeId;
      }
      if (productDetailId) {
        whereClause.productDetailId = productDetailId;
      }

      const sizeProductDetails = await SizeProductDetails.findAll({
        where: whereClause,
        include: [Sizes, ProductDetails],
      });

      res.status(200).json({
        message: "Lấy chi tiết kích thước sản phẩm thành công",
        code: 0,
        data: sizeProductDetails,
      });
    } catch (error) {
      console.error(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Lấy chi tiết kích thước sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  getSizeProductDetailById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { SizeProductDetailId } = req.body;
      const sizeProductDetail = await SizeProductDetails.findByPk(
        SizeProductDetailId,
        {
          include: [Sizes, ProductDetails],
        }
      );

      if (sizeProductDetail) {
        res.status(200).json({
          message: "Lấy chi tiết kích thước sản phẩm thành công",
          code: 0,
          data: sizeProductDetail,
        });
      } else {
        res.status(404).json({
          message: "Chi tiết kích thước sản phẩm không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Lấy chi tiết kích thước sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  updateSizeProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { SizeProductDetailId } = req.body;
      const { sizeId, productDetailId, quantity } = req.body;

      const sizeProductDetail = await SizeProductDetails.findByPk(
        SizeProductDetailId
      );

      if (sizeProductDetail) {
        await sizeProductDetail.update({
          sizeId,
          productDetailId,
          quantity,
        });

        res.status(200).json({
          message: "Cập nhật chi tiết kích thước sản phẩm thành công",
          code: 0,
          data: sizeProductDetail,
        });
      } else {
        res.status(404).json({
          message: "Chi tiết kích thước sản phẩm không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Cập nhật chi tiết kích thước sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  deleteSizeProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { SizeProductDetailId } = req.body;
      const sizeProductDetail = await SizeProductDetails.findByPk(
        SizeProductDetailId
      );

      if (sizeProductDetail) {
        await sizeProductDetail.destroy();

        res.status(200).json({
          message: "Xóa chi tiết kích thước sản phẩm thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Chi tiết kích thước sản phẩm không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Xóa chi tiết kích thước sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },
};

export default SizeProductDetailsController;
