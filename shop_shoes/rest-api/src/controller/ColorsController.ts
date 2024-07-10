import { Request, Response, NextFunction } from "express";
import { Colors } from "../models/Colors";

const ColorsController = {
  // Lấy danh sách các màu sắc
  getColors: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const colors = await Colors.findAll();
      res.json({ data: colors });
    } catch (error) {
      next(error);
    }
  },

  // Lấy chi tiết một màu sắc bằng ID
  getColorById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const color = await Colors.findByPk(id);
      if (color) {
        res.json({ data: color });
      } else {
        res.status(404).json({ message: "Color not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  // Thêm một màu sắc mới
  addColor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { colorName } = req.body;
      const color = await Colors.create({ colorName });
      res.json({ data: color, message: "Color added successfully" });
    } catch (error) {
      next(error);
    }
  },

  // Cập nhật thông tin một màu sắc
  updateColor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { colorName } = req.body;
      const color = await Colors.findByPk(id);
      if (color) {
        await color.update({ colorName });
        res.json({ message: "Color updated successfully" });
      } else {
        res.status(404).json({ message: "Color not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  // Xóa một màu sắc
  deleteColor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const color = await Colors.findByPk(id);
      if (color) {
        await color.destroy();
        res.json({ message: "Color deleted successfully" });
      } else {
        res.status(404).json({ message: "Color not found" });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default ColorsController;
