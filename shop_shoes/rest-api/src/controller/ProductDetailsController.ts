import { Request, Response, NextFunction } from "express";
import { ProductDetails } from "../models/ProductDetails";
import { SizeColor } from "../models/SizeColor";
import { Product } from "../models/Product";

class ProductDetailsController {
  public async addProductDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { pDetailQuantity, pDetailStatus, sizeColorID, productID } =
        req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!sizeColorID || !productID) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Kiểm tra xem sizeColorID và productID có tồn tại không
      const sizeColor = await SizeColor.findByPk(sizeColorID);
      const product = await Product.findByPk(productID);
      if (!sizeColor || !product) {
        return res
          .status(404)
          .json({ message: "SizeColor or Product not found" });
      }

      const productDetails = await ProductDetails.create({
        pDetailQuantity,
        pDetailStatus,
        sizeColorID,
        productID,
      });

      res.json({
        data: productDetails,
        message: "Add new product details successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async getProductDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, sizeColorID, productID } = req.query;
      const whereClause: any = {};

      if (id) {
        whereClause.pDetailID = id;
      }
      if (sizeColorID) {
        whereClause.sizeColorID = sizeColorID;
      }
      if (productID) {
        whereClause.productID = productID;
      }

      const productDetails = await ProductDetails.findAll({
        where: whereClause,
      });
      res.json({ data: productDetails });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async getProductDetailsById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const productDetails = await ProductDetails.findByPk(id);
      if (productDetails) {
        res.json({ data: productDetails });
      } else {
        res.status(404).json({ message: "Product details not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async updateProductDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { pDetailQuantity, pDetailStatus, sizeColorID, productID } =
        req.body;

      // Kiểm tra dữ liệu đầu vào
      if (!sizeColorID || !productID) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const productDetails = await ProductDetails.findByPk(id);
      if (productDetails) {
        await productDetails.update({
          pDetailQuantity,
          pDetailStatus,
          sizeColorID,
          productID,
        });
        res.json({ message: "Product details updated successfully" });
      } else {
        res.status(404).json({ message: "Product details not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  public async deleteProductDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const productDetails = await ProductDetails.findByPk(id);
      if (productDetails) {
        await productDetails.destroy();
        res.json({ message: "Product details deleted successfully" });
      } else {
        res.status(404).json({ message: "Product details not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default new ProductDetailsController();
