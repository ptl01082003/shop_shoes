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

      res.json({ data: product, message: "Product added successfully" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // READ - Get all products
  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Products.findAll();
      res.json({ data: products });
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
        res.json({ data: product });
      } else {
        res.status(404).json({ message: "Product not found" });
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
        res.json({ message: "Product updated successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
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
        res.json({ message: "Product deleted successfully" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default ProductController;
