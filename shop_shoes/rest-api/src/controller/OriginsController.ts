import { Request, Response, NextFunction } from "express";
import { Origins } from "../models/Origins";
import { Op } from "sequelize";

const OriginsController = {
  addOrigin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { originName } = req.body;
      const origin = await Origins.create({ originName });
      res.status(201).json({
        message: "Thực hiện thành công",
        code: 0,
        data: origin,
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

  getOrigins: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { originID, originName } = req.query;
      const whereClause: any = {};

      if (originID) {
        whereClause.originId = originID;
      }
      if (originName) {
        whereClause.originName = { [Op.like]: `%${originName}%` };
      }

      const origins = await Origins.findAll({ where: whereClause });
      res.status(200).json({
        message: "Thực hiện thành công",
        code: 0,
        data: origins,
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
      const { originID } = req.body;
      const origin = await Origins.findByPk(originID);
      if (origin) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: origin,
        });
      } else {
        res.status(404).json({
          message: "Nguồn gốc không tồn tại",
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

  updateOrigin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { originID } = req.params;
      const { originName } = req.body;
      const origin = await Origins.findByPk(originID);
      if (origin) {
        await origin.update({ originName });
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: origin,
        });
      } else {
        res.status(404).json({
          message: "Nguồn gốc không tồn tại",
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

  deleteOrigin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { originID } = req.params;
      const origin = await Origins.findByPk(originID);
      if (origin) {
        await origin.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Nguồn gốc không tồn tại",
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

export default OriginsController;
