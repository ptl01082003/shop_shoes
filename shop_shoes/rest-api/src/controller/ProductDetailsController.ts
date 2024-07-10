import { Request, Response, NextFunction } from "express";
import { ProductDetails } from "../models/ProductDetails";
import { SizeColor } from "../models/SizeColor";

const ProductDetailsController = {
  addProductDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { pDetailQuantity, pDetailStatus, productID, sizeColors } =
        req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!productID || !Array.isArray(sizeColors)) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const productDetail = await ProductDetails.create({
        pDetailQuantity,
        pDetailStatus,
        productID,
      });

      const sizeColorEntries = sizeColors.map((entry: any) => ({
        ...entry,
        productDetailID: productDetail.pDetailID,
      }));

      await SizeColor.bulkCreate(sizeColorEntries);

      res.json({
        data: productDetail,
        message: "Product detail created successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getProductDetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productID } = req.query;
      const whereClause: any = {};

      if (productID) {
        whereClause.productID = productID;
      }

      const productDetails = await ProductDetails.findAll({
        where: whereClause,
        include: [SizeColor],
      });
      res.json({ data: productDetails });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getProductDetailById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const productDetail = await ProductDetails.findByPk(id, {
        include: [SizeColor],
      });
      if (productDetail) {
        res.json({ data: productDetail });
      } else {
        res.status(404).json({ message: "Product detail not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { pDetailQuantity, pDetailStatus, sizeColors } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!Array.isArray(sizeColors)) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const productDetail = await ProductDetails.findByPk(id);
      if (productDetail) {
        await productDetail.update({ pDetailQuantity, pDetailStatus });

        // Xóa các sizeColors cũ
        await SizeColor.destroy({ where: { productDetailID: id } });

        // Tạo lại các sizeColors mới
        const sizeColorEntries = sizeColors.map((entry: any) => ({
          ...entry,
          productDetailID: id,
        }));

        await SizeColor.bulkCreate(sizeColorEntries);

        res.json({ message: "Product detail updated successfully" });
      } else {
        res.status(404).json({ message: "Product detail not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const productDetail = await ProductDetails.findByPk(id);
      if (productDetail) {
        // Xóa các sizeColors liên quan
        await SizeColor.destroy({ where: { productDetailID: id } });

        await productDetail.destroy();
        res.json({ message: "Product detail deleted successfully" });
      } else {
        res.status(404).json({ message: "Product detail not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default ProductDetailsController;
