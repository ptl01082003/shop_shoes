import { Request, Response, NextFunction } from "express";
import { Colors } from "../models/Colors";

const ColorsController = {
  // Lấy danh sách các màu sắc
  getColors: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const colors = await Colors.findAll();
      res.status(200).json({
        message: "Thực hiện thành công",
        code: 0,
        data: colors,
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  // Lấy chi tiết một màu sắc bằng ID
  getColorById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const color = await Colors.findByPk(id);
      if (color) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: color,
        });
      } else {
        res.status(404).json({
          message: "Màu sắc không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  // Thêm một màu sắc mới
  addColor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { colorName } = req.body;
      const color = await Colors.create({ colorName });
      res.status(201).json({
        message: "Thực hiện thành công",
        code: 0,
        data: color,
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
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
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: color,
        });
      } else {
        res.status(404).json({
          message: "Màu sắc không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },

  // Xóa một màu sắc
  deleteColor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const color = await Colors.findByPk(id);
      if (color) {
        await color.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Màu sắc không tồn tại",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Thực hiện thất bại";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Thực hiện thất bại",
        code: 1,
        error: errorMessage,
      });
    }
  },
};

export default ColorsController;
