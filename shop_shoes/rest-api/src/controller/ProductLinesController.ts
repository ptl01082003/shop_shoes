// controllers/ProductLinesController.ts
import { Request, Response, NextFunction } from "express";
import { ProductLines } from "../models/ProductLines";

const ProductLinesController = {
  addProductLine: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productLineName, brandID } = req.body;
      const productLine = await ProductLines.create({
        productLineName,
        brandID,
      });
      res.json({
        data: productLine,
        message: "Add new product line successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  getProductLines: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productLines = await ProductLines.findAll();
      res.json({ data: productLines });
    } catch (error) {
      next(error);
    }
  },

  getProductLineById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const productLine = await ProductLines.findByPk(id);
      if (productLine) {
        res.json({ data: productLine });
      } else {
        res.status(404).json({ message: "Product line not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  updateProductLine: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { productLineName, brandID } = req.body;
      const productLine = await ProductLines.findByPk(id);
      if (productLine) {
        await productLine.update({ productLineName, brandID });
        res.json({ message: "Product line updated successfully" });
      } else {
        res.status(404).json({ message: "Product line not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteProductLine: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const productLine = await ProductLines.findByPk(id);
      if (productLine) {
        await productLine.destroy();
        res.json({ message: "Product line deleted successfully" });
      } else {
        res.status(404).json({ message: "Product line not found" });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default ProductLinesController;
