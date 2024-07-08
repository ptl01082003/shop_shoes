// controllers/ProductColorsController.ts
import { Request, Response, NextFunction } from "express";
import { ProductColors } from "../models/ProductColors";
import { Product } from "../models/Product";
import { Colors } from "../models/Colors";

const ProductColorsController = {
  addProductColor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productID, colorID } = req.body;
      console.log(req.body);
      // Check if productID exists in Product table
      const existingProduct = await Product.findByPk(productID);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if colorID exists in Colors table
      const existingColor = await Colors.findByPk(colorID);
      if (!existingColor) {
        return res.status(404).json({ message: "Color not found" });
      }

      // Create a new entry in ProductColors table
      const productColor = await ProductColors.create({ productID, colorID });

      res.json({
        data: productColor,
        message: "Product color added successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  getProductColors: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productID, colorID } = req.query;
      const whereClause: any = {};

      if (productID) {
        whereClause.productID = productID;
      }
      if (colorID) {
        whereClause.colorID = colorID;
      }

      const productColors = await ProductColors.findAll({
        where: whereClause,
        include: [Product, Colors],
      });
      res.json({ data: productColors });
    } catch (error) {
      next(error);
    }
  },

  getProductColorById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const productColor = await ProductColors.findByPk(id, {
        include: [Product, Colors],
      });
      if (productColor) {
        res.json({ data: productColor });
      } else {
        res.status(404).json({ message: "Product color not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  updateProductColor: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { productID, colorID } = req.body;
      const productColor = await ProductColors.findByPk(id);
      if (productColor) {
        await productColor.update({ productID, colorID });
        res.json({ message: "Product color updated successfully" });
      } else {
        res.status(404).json({ message: "Product color not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteProductColor: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const productColor = await ProductColors.findByPk(id);
      if (productColor) {
        await productColor.destroy();
        res.json({ message: "Product color deleted successfully" });
      } else {
        res.status(404).json({ message: "Product color not found" });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default ProductColorsController;
