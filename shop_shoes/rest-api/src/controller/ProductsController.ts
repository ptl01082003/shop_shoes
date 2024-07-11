import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
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
        productLineID,
        originID,
        styleID,
        materialID,
        colorID,
      } = req.body;

      const product = await Products.create({
        productsName,
        productImportPrice,
        productPrice,
        status,
        display,
        productLineID,
        originID,
        styleID,
        materialID,
        colorID,
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
      const { id, productName, productLineID } = req.query;
      const whereClause: any = {};

      if (id) {
        whereClause.id = id;
      }
      if (productName) {
        whereClause.productsName = { [Op.like]: `%${productName}%` };
      }
      if (productLineID) {
        whereClause.productLineID = productLineID;
      }

      const products = await Products.findAll({ where: whereClause });
      res.status(200).json({
        message: "Lấy danh sách sản phẩm thành công",
        code: 0,
        data: products,
      });
    } catch (error) {
      console.error(error);
      next(error);
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
      next(error);
    }
  },

  // UPDATE - Update product by ID
  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { productsName, productPrice } = req.body;

      const product = await Products.findByPk(id);
      if (product) {
        await product.update({
          productsName,
          productPrice,
        });
        res.status(200).json({
          message: "Cập nhật thông tin sản phẩm thành công",
          code: 0,
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
      next(error);
    }
  },
};

export default ProductController;
