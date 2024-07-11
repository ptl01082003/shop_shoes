// controllers/ProductDetailsController.ts
import { Request, Response, NextFunction } from "express";
import { ProductDetails } from "../models/ProductDetails";
import { Products } from "../models/Products";
import { SizeProductDetails } from "../models/SizeProductDetails";

const ProductDetailsController = {
  addProductDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productID, productDetailstatus } = req.body;

      // Check if the productID exists in Products table
      const product = await Products.findByPk(productID);
      if (!product) {
        return res.status(404).json({
          message: "Sản phẩm không tồn tại",
          code: 1,
        });
      }

      const productDetail = await ProductDetails.create({
        productID,
        productDetailstatus,
      });
      res.status(201).json({
        message: "Thêm chi tiết sản phẩm thành công",
        code: 0,
        data: productDetail,
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thêm chi tiết sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  getProductDetailById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const productDetail = await ProductDetails.findByPk(id, {
        include: [{ model: SizeProductDetails, as: "sizeProductDetails" }],
      });
      if (productDetail) {
        res.status(200).json({
          message: "Lấy chi tiết sản phẩm thành công",
          code: 0,
          data: productDetail,
        });
      } else {
        res.status(404).json({
          message: "Chi tiết sản phẩm không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Lấy chi tiết sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  getProductDetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, productID } = req.query;
      const whereClause: any = {};

      if (id) {
        whereClause.productDetailID = id;
      }
      if (productID) {
        whereClause.productID = productID;
      }

      const productDetails = await ProductDetails.findAll({
        where: whereClause,
        include: [{ model: SizeProductDetails, as: "sizeProductDetails" }],
      });
      res.status(200).json({
        message: "Lấy chi tiết sản phẩm thành công",
        code: 0,
        data: productDetails,
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Lấy chi tiết sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  updateProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { productID, productDetailstatus } = req.body;
      const productDetail = await ProductDetails.findByPk(id);
      if (productDetail) {
        // Check if the updated productID exists in Products table
        if (productID) {
          const product = await Products.findByPk(productID);
          if (!product) {
            return res.status(404).json({
              message: "Sản phẩm không tồn tại",
              code: 1,
            });
          }
        }

        await productDetail.update({ productID, productDetailstatus });
        res.status(200).json({
          message: "Cập nhật chi tiết sản phẩm thành công",
          code: 0,
          data: productDetail,
        });
      } else {
        res.status(404).json({
          message: "Chi tiết sản phẩm không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Cập nhật chi tiết sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  deleteProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const productDetail = await ProductDetails.findByPk(id);
      if (productDetail) {
        await productDetail.destroy();
        res.status(200).json({
          message: "Xóa chi tiết sản phẩm thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Chi tiết sản phẩm không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Xóa chi tiết sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },
};

export default ProductDetailsController;
