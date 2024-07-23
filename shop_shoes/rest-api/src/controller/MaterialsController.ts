import { Request, Response, NextFunction } from "express";
import { Materials } from "../models/Materials";
import { Op } from "sequelize";

const MaterialsController = {
  addMaterial: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { materialName } = req.body;
      const material = await Materials.create({ materialName });
      res.status(201).json({
        message: "Thực hiện thành công",
        code: 0,
        data: material,
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

  getMaterials: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { materialID, materialName } = req.query;
      const whereClause: any = {};

      if (materialID) {
        whereClause.materialID = materialID;
      }
      if (materialName) {
        whereClause.materialName = { [Op.like]: `%${materialName}%` };
      }

      const materials = await Materials.findAll({ where: whereClause });
      res.status(200).json({
        message: "Thực hiện thành công",
        code: 0,
        data: materials,
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

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { materialID } = req.body;
      const material = await Materials.findByPk(materialID);
      if (material) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: material,
        });
      } else {
        res.status(404).json({
          message: "Vật liệu không tồn tại",
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

  updateMaterial: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { materialID, materialName } = req.body;
      const material = await Materials.findByPk(materialID);
      if (material) {
        await material.update({ materialName });
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: material,
        });
      } else {
        res.status(404).json({
          message: "Vật liệu không tồn tại",
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

  deleteMaterial: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { materialID } = req.body;
      const material = await Materials.findByPk(materialID);
      if (material) {
        await material.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Vật liệu không tồn tại",
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

export default MaterialsController;
