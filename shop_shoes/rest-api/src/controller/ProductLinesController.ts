import { Request, Response, NextFunction } from "express";
import { ProductLines } from "../models/ProductLines";

const ProductLinesController = {
  addProductLine: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productLineName, brandID } = req.body;
      const productLine = await ProductLines.create({
        productLineName,
        brandID,
      });
      res.status(201).json({
        message: "Thực hiện thành công",
        code: 0,
        data: productLine,
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

  getProductLines: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productLines = await ProductLines.findAll();
      res.status(200).json({
        message: "Thực hiện thành công",
        code: 0,
        data: productLines,
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

  getProductLineById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const productLine = await ProductLines.findByPk(id);
      if (productLine) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: productLine,
        });
      } else {
        res.status(404).json({
          message: "Dòng sản phẩm không tồn tại",
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

  updateProductLine: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { productLineName, brandID } = req.body;
      const productLine = await ProductLines.findByPk(id);
      if (productLine) {
        await productLine.update({ productLineName, brandID });
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: productLine,
        });
      } else {
        res.status(404).json({
          message: "Dòng sản phẩm không tồn tại",
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

  deleteProductLine: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const productLine = await ProductLines.findByPk(id);
      if (productLine) {
        await productLine.destroy();
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Dòng sản phẩm không tồn tại",
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

export default ProductLinesController;
