import { Request, Response, NextFunction } from "express";
import { SizeColor } from "../models/SizeColor";

const SizeColorController = {
  addSizeColor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sizeID, colorID } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!sizeID || !colorID) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const sizeColor = await SizeColor.create({ sizeID, colorID });

      res.json({ data: sizeColor, message: "Add new size-color successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getSizeColors: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sizeID, colorID } = req.query;
      const whereClause: any = {};

      if (sizeID) {
        whereClause.sizeID = sizeID;
      }
      if (colorID) {
        whereClause.colorID = colorID;
      }

      const sizeColors = await SizeColor.findAll({ where: whereClause });
      res.json({ data: sizeColors });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getSizeColorById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const sizeColor = await SizeColor.findByPk(id);
      if (sizeColor) {
        res.json({ data: sizeColor });
      } else {
        res.status(404).json({ message: "SizeColor not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateSizeColor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { sizeID, colorID } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!sizeID || !colorID) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const sizeColor = await SizeColor.findByPk(id);
      if (sizeColor) {
        await sizeColor.update({ sizeID, colorID });
        res.json({ message: "SizeColor updated successfully" });
      } else {
        res.status(404).json({ message: "SizeColor not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteSizeColor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const sizeColor = await SizeColor.findByPk(id);
      if (sizeColor) {
        await sizeColor.destroy();
        res.json({ message: "SizeColor deleted successfully" });
      } else {
        res.status(404).json({ message: "SizeColor not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default SizeColorController;
