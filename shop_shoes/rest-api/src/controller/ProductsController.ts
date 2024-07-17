import { Request, Response, NextFunction } from "express";
import { Products } from "../models/Products";

const ProductController = {
  // CREATE - Add a new product
  addProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        productsName,
        productImportPrice,
        productPrice,
        status,
        display,
        originID,
        styleID,
        materialID,
        brandID,
      } = req.body;

      const product = await Products.create({
        productsName,
        productImportPrice,
        productPrice,
        status,
        display,
        originID,
        styleID,
        materialID,
        brandID,
      });

      res.status(201).json({
        message: "Thêm sản phẩm thành công",
        code: 0,
        data: product,
      });
    } catch (error) {
      console.error(error);
      let errorMessage = "Thêm sản phẩm thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thêm sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  // READ - Get all products
  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Products.findAll();
      res.status(200).json({
        message: "Lấy danh sách sản phẩm thành công",
        code: 0,
        data: products,
      });
    } catch (error) {
      console.error(error);
      let errorMessage = "Lấy ds sản phẩm thất bại";

      res.status(401).json({
        message: "Lấy ds sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  // READ - Get product by ID
  getProductById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id);
      if (product) {
        res.status(200).json({
          message: "Lấy thông tin sản phẩm thành công",
          code: 0,
          data: product,
        });
      } else {
        res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "Lấy ds sản phẩm thất bại";

      res.status(401).json({
        message: "Lấy ds sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  // UPDATE - Update product by ID
  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const {
        productsName,
        productImportPrice,
        productPrice,
        status,
        display,
        originID,
        styleID,
        materialID,
        brandID,
      } = req.body;

      const product = await Products.findByPk(id);
      if (product) {
        await product.update({
          productsName,
          productImportPrice,
          productPrice,
          status,
          display,
          originID,
          styleID,
          materialID,
          brandID,
        });
        res.status(201).json({
          message: "Sửa sản phẩm thành công",
          code: 0,
          data: product,
        });
      } else {
        res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // DELETE - Delete product by ID
  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id);
      if (product) {
        await product.destroy();
        res.status(200).json({
          message: "Xóa sản phẩm thành công",
          code: 0,
          data: { id },
        });
      } else {
        res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "Xóa sản phẩm thất bại";

      res.status(401).json({
        message: "Xóa sản phẩm thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },
};

export default ProductController;
