// controllers/SizesController.ts
import { Request, Response, NextFunction } from "express";
import { Sizes } from "../models/Sizes";
import { SizeProductDetails } from "../models/SizeProductDetails";

const SizesController = {
  // CREATE - Add a new size
  addSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sizeName } = req.body;
      const size = await Sizes.create({ sizeName });
      res.status(201).json({
        message: "Thêm kích thước thành công",
        code: 0,
        data: size,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // READ - Get all sizes
  getSizes: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sizes = await Sizes.findAll({
        include: [{ model: SizeProductDetails }],
      });
      res.status(200).json({
        message: "Lấy danh sách kích thước thành công",
        code: 0,
        data: sizes,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // READ - Get size by ID
  getSizeById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const size = await Sizes.findByPk(id, {
        include: [{ model: SizeProductDetails }],
      });
      if (size) {
        res.status(200).json({
          message: "Lấy kích thước thành công",
          code: 0,
          data: size,
        });
      } else {
        res.status(404).json({
          message: "Không tìm thấy kích thước",
          code: 1,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // UPDATE - Update size by ID
  updateSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { sizeName } = req.body;
      const size = await Sizes.findByPk(id);
      if (size) {
        await size.update({ sizeName });
        res.status(200).json({
          message: "Cập nhật thông tin kích thước thành công",
          code: 0,
          data: size,
        });
      } else {
        res.status(404).json({
          message: "Không tìm thấy kích thước",
          code: 1,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // DELETE - Delete size by ID
  deleteSize: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const size = await Sizes.findByPk(id);
      if (size) {
        await size.destroy();
        res.status(200).json({
          message: "Xóa kích thước thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Không tìm thấy kích thước",
          code: 1,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

export default SizesController;
