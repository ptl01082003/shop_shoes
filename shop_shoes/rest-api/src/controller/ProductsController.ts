import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { Products } from "../models/Products";

const ProductsController = {
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

      // Kiểm tra dữ liệu đầu vào
      // if (
      //   !productsName ||
      //   !productImportPrice ||
      //   !productLineID ||
      //   !originID ||
      //   !styleID ||
      //   !materialID ||
      //   !colorID
      // ) {
      //   return res.status(400).json({ message: "Missing required fields" });
      // }

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

      res.json({ data: product, message: "Add new product successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, productName, productLineID } = req.query;
      const whereClause: any = {};

      if (id) {
        whereClause.id = id;
      }
      if (productName) {
        whereClause.productName = { [Op.like]: `%${productName}%` };
      }
      if (productLineID) {
        whereClause.productLineID = productLineID;
      }

      const products = await Products.findAll({ where: whereClause });
      res.json({ data: products });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getProductById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id);
      if (product) {
        res.json({ data: product });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
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

      // Kiểm tra dữ liệu đầu vào
      if (
        !productsName ||
        !productImportPrice ||
        !productLineID ||
        !originID ||
        !styleID ||
        !materialID ||
        !colorID
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const product = await Products.findByPk(id);
      if (product) {
        await product.update({
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
        res.json({ message: "Product updated successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id);
      if (product) {
        await product.destroy();
        res.json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default ProductsController;
