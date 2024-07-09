import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import { Product } from "../models/Product";

const ProductsController = {
  addProduct: async (req: Request, res: Response, next: NextFunction) => {
    console.log("hihi");
    try {
      const {
        productName,
        productNumber,
        productImportPrice,
        productPrice,
        status,
        display,
        productLineID,
        originID,
        styleID,
        materialID,
      } = req.body;

      console.log("productName:", productName);
      console.log("productNumber:", productNumber);
      console.log("productImportPrice:", productImportPrice);
      console.log("productPrice:", productPrice);
      console.log("status:", status);
      console.log("display:", display);
      console.log("productLineID:", productLineID);
      console.log("originID:", originID);
      console.log("styleID:", styleID);
      console.log("materialID:", materialID);
      console.log(req.body);

      // Kiểm tra dữ liệu đầu vào
      if (!productName || !productImportPrice || !productPrice) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const product = await Product.create({
        productName,
        productNumber,
        productImportPrice,
        productPrice,
        status,
        display,
        productLineID,
        originID,
        styleID,
        materialID,
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

      const products = await Product.findAll({ where: whereClause });
      res.json({ data: products });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getProductById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
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
        productName,
        productNumber,
        productImportPrice,
        productPrice,
        status,
        display,
        productLineID,
        originID,
        styleID,
        materialID,
      } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!productName || !productImportPrice || !productPrice) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const product = await Product.findByPk(id);
      if (product) {
        await product.update({
          productName,
          productNumber,
          productImportPrice,
          productPrice,
          status,
          display,
          productLineID,
          originID,
          styleID,
          materialID,
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
      const product = await Product.findByPk(id);
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
