import { Request, Response, NextFunction } from "express";
import { Images } from "../models/Images";
import { Products } from "../models/Products";
import { Op } from "sequelize";

const ImagesController = {
  addImage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { path, productId } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!path) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const image = await Images.create({
        path,
        productId,
      });

      res.json({ data: image, message: "Add new image successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getImages: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.query;
      const whereClause: any = {};

      if (productId) {
        whereClause.productId = productId;
      }

      // Find all images with optional Product association
      const images = await Images.findAll({
        where: whereClause,
        include: [Products],
      });

      res.json({ data: images });
    } catch (error) {
      console.error("Error retrieving images:", error);
      next(error);
    }
  },

  getImageById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { imageId } = req.body;
      const image = await Images.findByPk(imageId, { include: [Products] });
      if (image) {
        res.json({ data: image });
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateImage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { imageId } = req.body;
      const { path, productId } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!path) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const image = await Images.findByPk(imageId);
      if (image) {
        await image.update({
          path,
          productId,
        });
        res.json({ message: "Image updated successfully" });
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteImage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { imageId } = req.body;
      const image = await Images.findByPk(imageId);
      if (image) {
        await image.destroy();
        res.json({ message: "Image deleted successfully" });
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default ImagesController;
