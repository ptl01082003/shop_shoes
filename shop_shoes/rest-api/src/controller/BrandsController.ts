import { Request, Response, NextFunction } from "express";
import { Brands } from "../models/Brands";
import { Op } from "sequelize";

const BrandsController = {
  addBrand: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { brandName } = req.body;
      const brand = await Brands.create({ brandName });
      res.status(201).json({
        message: "Thực hiện thành công",
        code: 0,
        data: brand,
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

  getBrands: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, brandName } = req.query;
      const whereClause: any = {};

      if (id) {
        whereClause.id = id;
      }
      if (brandName) {
        whereClause.brandName = { [Op.like]: `%${brandName}%` };
      }

      const brands = await Brands.findAll({ where: whereClause });
      res.status(200).json({
        message: "Thực hiện thành công",
        code: 0,
        data: brands,
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
      const { id } = req.params;
      const brand = await Brands.findByPk(id);
      if (brand) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: brand,
        });
      } else {
        res.status(404).json({
          message: "Thương hiệu không tồn tại",
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

  updateBrand: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { brandName } = req.body;
      const brand = await Brands.findByPk(id);
      if (brand) {
        await brand.update({ brandName });
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: brand,
        });
      } else {
        res.status(404).json({
          message: "Thương hiệu không tồn tại",
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

  deleteBrand: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const brand = await Brands.findByPk(id);
      if (brand) {
        await brand.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Thương hiệu không tồn tại",
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

export default BrandsController;
