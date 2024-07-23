import { Request, Response, NextFunction } from "express";
import { ProductPromotion } from "../models/ProductPromotion";
import { Products } from "../models/Products";
import { Promotions } from "../models/Promotions";

const ProductPromotionController = {
  addProductPromotion: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productID, promotionID } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!productID || !promotionID) {
        return res.status(400).json({ message: "Thiếu trường bắt buộc" });
      }

      // Kiểm tra sự tồn tại của Product và Promotions
      const product = await Products.findByPk(productID);
      const promotion = await Promotions.findByPk(promotionID);

      if (!product || !promotion) {
        return res
          .status(404)
          .json({ message: "Product hoặc Promotion không tồn tại" });
      }

      const productPromotion = await ProductPromotion.create({
        productID,
        promotionID,
      });

      res.json({
        data: productPromotion,
        message: "Thêm ProductPromotion thành công",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getProductPromotions: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productPromotions = await ProductPromotion.findAll({
        include: [Products, Promotions],
      });
      res.json({ data: productPromotions });
    } catch (error) {
      console.log("Error retrieving product promotions:", error);
      next(error);
    }
  },

  getProductPromotionById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productID, promotionID } = req.body;
      const productPromotion = await ProductPromotion.findOne({
        where: { productID, promotionID },
        include: [Products, Promotions],
      });
      if (productPromotion) {
        res.json({ data: productPromotion });
      } else {
        res.status(404).json({ message: "ProductPromotion không tồn tại" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateProductPromotion: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productID, promotionID } = req.body;
      const { newProductID, newPromotionID } = req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!newProductID || !newPromotionID) {
        return res.status(400).json({ message: "Thiếu trường bắt buộc" });
      }

      const productPromotion = await ProductPromotion.findOne({
        where: { productID, promotionID },
      });
      if (productPromotion) {
        await productPromotion.update({
          productID: newProductID,
          promotionID: newPromotionID,
        });
        res.json({ message: "Cập nhật ProductPromotion thành công" });
      } else {
        res.status(404).json({ message: "ProductPromotion không tồn tại" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteProductPromotion: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productID, promotionID } = req.body;
      const productPromotion = await ProductPromotion.findOne({
        where: { productID, promotionID },
      });
      if (productPromotion) {
        await productPromotion.destroy();
        res.json({ message: "Xóa ProductPromotion thành công" });
      } else {
        res.status(404).json({ message: "ProductPromotion không tồn tại" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default ProductPromotionController;
