// controllers/OriginsController.ts
import { Request, Response, NextFunction } from "express";
import { Origins } from "../models/Origins";
import { Op } from "sequelize";

const OriginsController = {
  addOrigin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { originName } = req.body;
      const origin = await Origins.create({ originName });
      res.json({ data: origin, message: "Add new origin successfully" });
    } catch (error) {
      next(error);
    }
  },

  getOrigins: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { originId, originName } = req.query;
      const whereClause: any = {};

      if (originId) {
        whereClause.originId = originId;
      }
      if (originName) {
        whereClause.originName = { [Op.like]: `%${originName}%` };
      }

      const origins = await Origins.findAll({ where: whereClause });
      res.json({ data: origins });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const origin = await Origins.findByPk(id);
      if (origin) {
        res.json({ data: origin });
      } else {
        res.status(404).json({ message: "Origin not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  updateOrigin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { originName } = req.body;
      const origin = await Origins.findByPk(id);
      if (origin) {
        await origin.update({ originName });
        res.json({ message: "Origin updated successfully" });
      } else {
        res.status(404).json({ message: "Origin not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteOrigin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const origin = await Origins.findByPk(id);
      if (origin) {
        await origin.destroy();
        res.json({ message: "Origin deleted successfully" });
      } else {
        res.status(404).json({ message: "Origin not found" });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default OriginsController;
