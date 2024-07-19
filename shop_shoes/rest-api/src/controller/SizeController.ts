import { Request, Response, NextFunction } from "express";
import { Sizes } from "../models/Sizes";
import { ProductDetails } from "../models/ProductDetails";
import { SizeProductDetails } from "../models/SizeProductDetails";

const SizeController = {
  createSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sizeName } = req.body;
      const newSize = await Sizes.create({ sizeName });

      res.status(201).json({
        message: "Size created successfully",
        code: 0,
        data: newSize,
      });
    } catch (error) {
      console.error("Error creating size:", error);
      res.status(500).json({
        message: "Failed to create size",
        code: 1,
      });
    }
  },

  getAllSizes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sizes = await Sizes.findAll({
        include: [
          {
            model: SizeProductDetails,
            include: [ProductDetails],
          },
        ],
      });

      res.status(200).json({
        message: "Sizes fetched successfully",
        code: 0,
        data: sizes,
      });
    } catch (error) {
      console.error("Error fetching sizes:", error);
      res.status(500).json({
        message: "Failed to fetch sizes",
        code: 1,
      });
    }
  },

  updateSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { sizeName } = req.body;
      const size = await Sizes.findByPk(id);

      if (size) {
        await size.update({ sizeName });

        res.status(200).json({
          message: "Size updated successfully",
          code: 0,
          data: size,
        });
      } else {
        res.status(404).json({
          message: "Size not found",
          code: 1,
        });
      }
    } catch (error) {
      console.error(`Error updating size ${req.params.id}:`, error);
      res.status(500).json({
        message: "Failed to update size",
        code: 1,
      });
    }
  },

  deleteSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const size = await Sizes.findByPk(id);

      if (size) {
        await size.destroy(); // Changed to instance method destroy()

        res.status(200).json({
          message: "Size deleted successfully",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Size not found",
          code: 1,
        });
      }
    } catch (error) {
      console.error(`Error deleting size ${req.params.id}:`, error);
      res.status(500).json({
        message: "Failed to delete size",
        code: 1,
      });
    }
  },

  getSizeById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const size = await Sizes.findByPk(id, {
        include: [SizeProductDetails], // Include SizeProductDetails if needed
      });

      if (size) {
        res.status(200).json({
          message: "Size fetched successfully",
          code: 0,
          data: size,
        });
      } else {
        res.status(404).json({
          message: "Size not found",
          code: 1,
        });
      }
    } catch (error) {
      console.error(`Error fetching size ${req.params.id}:`, error);
      res.status(500).json({
        message: "Failed to fetch size",
        code: 1,
      });
    }
  },
};

export default SizeController;
