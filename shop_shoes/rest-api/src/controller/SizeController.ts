import { Request, Response, NextFunction } from "express";
import { Sizes } from "../models/Sizes";
import { ProductDetails } from "../models/ProductDetails";

const SizesController = {
  addSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sizeName, sizeQuantity, productDetailID } = req.body;

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

      res.json({ data: size, message: "Thêm size mới thành công" });
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
        res.status(404).json({ message: "Không tìm thấy size" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  updateSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { sizeName, sizeQuantity, productDetailID } = req.body;

      if (!sizeName || !productDetailID) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const size = await Sizes.findByPk(id);

      if (!size) {
        return res.status(404).json({ message: "Không tìm thấy size" });
      }

      const productDetail = await ProductDetails.findByPk(productDetailID);

      if (!productDetail) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy ProductDetail" });
      }

      await size.update({ sizeName, sizeQuantity, productDetailID });

      res.json({ message: "Cập nhật size thành công" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  deleteSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const size = await Sizes.findByPk(id);
      if (size) {
        await size.destroy();
        res.json({ message: "Xóa size thành công" });
      } else {
        res.status(404).json({ message: "Không tìm thấy size" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default SizesController;
