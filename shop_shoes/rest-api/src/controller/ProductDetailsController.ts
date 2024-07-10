import { Request, Response, NextFunction } from "express";
import { ProductDetails } from "../models/ProductDetails";
import { Products } from "../models/Products";
import { Sizes } from "../models/Sizes";

const ProductDetailsController = {
  addProductDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productID, pDetailStatus } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!productID) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const product = await Products.findByPk(productID);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const productDetail = await ProductDetails.create({
        productID,
        pDetailStatus,
      });

      res.json({
        data: productDetail,
        message: "Product detail created successfully",
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  getProductDetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productDetails = await ProductDetails.findAll({
        include: [Products, Sizes],
      });
      res.json({ data: productDetails });
    } catch (error) {
      console.error(error);
      next(error);
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
        include: [Products, Sizes],
      });
      if (!productDetail) {
        return res.status(404).json({ message: "Product detail not found" });
      }
      res.json({ data: productDetail });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updateProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { productID, pDetailStatus } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!productID) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const productDetail = await ProductDetails.findByPk(id);
      if (!productDetail) {
        return res.status(404).json({ message: "Product detail not found" });
      }

      // Kiểm tra và cập nhật sản phẩm liên quan
      const product = await Products.findByPk(productID);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await productDetail.update({ productID, pDetailStatus });
      res.json({ message: "Product detail updated successfully" });
    } catch (error) {
      console.error(error);
      next(error);
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
      if (!productDetail) {
        return res.status(404).json({ message: "Product detail not found" });
      }
      await productDetail.destroy();
      res.json({ message: "Product detail deleted successfully" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default ProductDetailsController;
