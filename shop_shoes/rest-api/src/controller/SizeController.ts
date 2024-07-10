import { Request, Response, NextFunction } from "express";
import { Sizes } from "../models/Sizes";
import { ProductDetails } from "../models/ProductDetails";

const SizesController = {
  addSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sizeName, sizeQuantity, productDetailID } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!sizeName || !productDetailID) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const productDetail = await ProductDetails.findByPk(productDetailID);

      if (!productDetail) {
        return res.status(404).json({ message: "ProductDetail not found" });
      }

      const size = await Sizes.create({
        sizeName,
        sizeQuantity,
        productDetailID,
      });

      res.json({ data: size, message: "Add new size successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getSizes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productDetailID } = req.query;
      const whereClause: any = {};

      if (productDetailID) {
        whereClause.productDetailID = productDetailID;
      }

      const sizes = await Sizes.findAll({ where: whereClause });
      res.json({ data: sizes });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getSizeById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const size = await Sizes.findByPk(id);
      if (size) {
        res.json({ data: size });
      } else {
        res.status(404).json({ message: "Size not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { sizeName, sizeQuantity, productDetailID } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!sizeName || !productDetailID) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const size = await Sizes.findByPk(id);

      if (!size) {
        return res.status(404).json({ message: "Size not found" });
      }

      const productDetail = await ProductDetails.findByPk(productDetailID);

      if (!productDetail) {
        return res.status(404).json({ message: "ProductDetail not found" });
      }

      await size.update({ sizeName, sizeQuantity, productDetailID });

      res.json({ message: "Size updated successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const size = await Sizes.findByPk(id);
      if (size) {
        await size.destroy();
        res.json({ message: "Size deleted successfully" });
      } else {
        res.status(404).json({ message: "Size not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default SizesController;
