import { Request, Response, NextFunction } from "express";
import { Products } from "../models/Products";
import { Op } from "sequelize";

const ProductsController = {
  addProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        productsName,
        productImportPrice,
        productPrice,
        status,
        display,
        originID,
        styleID,
        materialID,
        brandID,
      } = req.body;
      const product = await Products.create({
        productsName,
        productImportPrice,
        productPrice,
        status,
        display,
        originID,
        styleID,
        materialID,
        brandID,
      });
      res.status(201).json({
        message: "Thực hiện thành công",
        code: 0,
        data: product,
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

  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, productCode, productsName } = req.query;
      const whereClause: any = {};

      if (id) {
        whereClause.productsID = id;
      }
      if (productCode) {
        whereClause.productCode = { [Op.like]: `%${productCode}%` };
      }

      const products = await Products.findAll({ where: whereClause });
      res.status(200).json({
        message: "Thực hiện thành công",
        code: 0,
        data: products,
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
      const product = await Products.findByPk(id);
      if (product) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: product,
        });
      } else {
        res.status(404).json({
          message: "Sản phẩm không tồn tại",
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

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const {
        productsName,
        productImportPrice,
        productPrice,
        status,
        display,
        originID,
        styleID,
        materialID,
        brandID,
      } = req.body;
      const product = await Products.findByPk(id);
      if (product) {
        await product.update({
          productsName,
          productImportPrice,
          productPrice,
          status,
          display,
          originID,
          styleID,
          materialID,
          brandID,
        });
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: product,
        });
      } else {
        res.status(404).json({
          message: "Sản phẩm không tồn tại",
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

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await Products.findByPk(id);
      if (product) {
        await product.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Sản phẩm không tồn tại",
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

export default ProductsController;
