// controllers/MaterialsController.ts
import { Request, Response, NextFunction } from "express";
import { Materials } from "../models/Materials";
import { Op } from "sequelize";

const MaterialsController = {
  addMaterial: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { materialName } = req.body;
      const material = await Materials.create({ materialName });
      res.json({ data: material, message: "Add new material successfully" });
    } catch (error) {
      next(error);
    }
  },

  getMaterials: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { materialId, materialName } = req.query;
      const whereClause: any = {};

      if (materialId) {
        whereClause.materialId = materialId;
      }
      if (materialName) {
        whereClause.materialName = { [Op.like]: `%${materialName}%` };
      }

      const materials = await Materials.findAll({ where: whereClause });
      res.json({ data: materials });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const material = await Materials.findByPk(id);
      if (material) {
        res.json({ data: material });
      } else {
        res.status(404).json({ message: "Material not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  updateMaterial: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { materialName } = req.body;
      const material = await Materials.findByPk(id);
      if (material) {
        await material.update({ materialName });
        res.json({ message: "Material updated successfully" });
      } else {
        res.status(404).json({ message: "Material not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteMaterial: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const material = await Materials.findByPk(id);
      if (material) {
        await material.destroy();
        res.json({ message: "Material deleted successfully" });
      } else {
        res.status(404).json({ message: "Material not found" });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default MaterialsController;
