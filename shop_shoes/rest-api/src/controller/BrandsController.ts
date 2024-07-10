// controllers/BrandsController.ts
import { Request, Response, NextFunction } from "express";
import { Brands } from "../models/Brands";
import { Op } from "sequelize";

const BrandsController = {
  addBrand: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { brandName } = req.body;
      const brand = await Brands.create({ brandName });
      res.json({ data: brand, message: "Add new brand successfully" });
    } catch (error) {
      next(error);
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
      res.json({ data: brands });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const brand = await Brands.findByPk(id);
      if (brand) {
        res.json({ data: brand });
      } else {
        res.status(404).json({ message: "Brand not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  updateBrand: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { brandName } = req.body;
      const brand = await Brands.findByPk(id);
      if (brand) {
        await brand.update({ brandName });
        res.json({ message: "Brand updated successfully" });
      } else {
        res.status(404).json({ message: "Brand not found" });
      }
    } catch (error) {
      next(error);
    }
  },

  deleteBrand: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const brand = await Brands.findByPk(id);
      if (brand) {
        await brand.destroy();
        res.json({ message: "Brand deleted successfully" });
      } else {
        res.status(404).json({ message: "Brand not found" });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default BrandsController;
