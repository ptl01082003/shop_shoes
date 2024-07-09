import { Request, Response, NextFunction } from "express";
import { Sizes } from "../models/Sizes";

const SizesController = {
  addSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sizeLength } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!sizeLength) {
        return res
          .status(400)
          .json({ message: "Missing required field: sizeLength" });
      }

      // Create a new entry in Sizes table
      const size = await Sizes.create({ sizeLength });

      res.json({
        data: size,
        message: "Size added successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  getSizes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sizes = await Sizes.findAll();
      res.json({ data: sizes });
    } catch (error) {
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
      next(error);
    }
  },

  updateSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { sizeLength } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!sizeLength) {
        return res
          .status(400)
          .json({ message: "Missing required field: sizeLength" });
      }

      const size = await Sizes.findByPk(id);
      if (size) {
        await size.update({ sizeLength });
        res.json({ message: "Size updated successfully" });
      } else {
        res.status(404).json({ message: "Size not found" });
      }
    } catch (error) {
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
      next(error);
    }
  },
};

export default SizesController;
