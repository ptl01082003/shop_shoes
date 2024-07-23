import { Request, Response, NextFunction } from "express";
import { Products } from "../models/Products";
import { Op } from "sequelize";
import { ProductDetails } from "../models/ProductDetails";
import { Images } from "../models/Images";
import { SizeProductDetails } from "../models/SizeProductDetails";
import { Sizes } from "../models/Sizes";

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
        imageGallery,
        productDetails,
        sizeQuantities,
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
      await ProductDetails.create({
        productId: product.productsID,
        productDetaildescription: productDetails,
      });
      if (Array.isArray(imageGallery)) {
        for await (const images of imageGallery) {
          await Images.create({
            productID: product.productsID,
            imagePath: images,
          });
        }
      }
      if (Array.isArray(sizeQuantities)) {
        for await (const { sizeID, quantity } of sizeQuantities) {
          await SizeProductDetails.create({
            productId: product.productsID,
            sizeID: sizeID,
            quantity: quantity,
          });
        }
      }
      res.json({
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
      const { productID, productCode, productsName } = req.query;
      const whereClause: any = {};

      if (productID) {
        whereClause.productsID = productID;
      }
      if (productCode) {
        whereClause.productCode = { [Op.like]: `%${productCode}%` };
      }

      const products = await Products.findAll({ where: whereClause });

      const transferData = [];

      for await (const product of products) {
        const productDetails = await ProductDetails.findOne({
          where: { productId: product.productsID },
          attributes: ["productDetaildescription"],
        });
        const images = await Images.findAll({
          where: { productId: product.productsID },
          attributes: ["imagePath"],
        });

        transferData.push({
          ...product.toJSON(),
          ...productDetails?.toJSON(),
          imageGallery: images,
        });
      }

      res.json({
        message: "Thực hiện thành công",
        code: 0,
        data: transferData,
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
      const { productID } = req.body;
      const product = await Products.findOne({
        where: {
          productsID: productID,
        },
      });
      const productDetails = await ProductDetails.findOne({
        where: { productId: productID },
        attributes: { include: ["productDetaildescription"] },
      });
      const sizes = await SizeProductDetails.findAll({
        where: { productId: product?.productsID },
        include: [{ model: Sizes, attributes: ["sizeName"] }],
      });
      if (product) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: {
            ...product,
            ...productDetails,
            ...sizes,
          },
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
      const { productID } = req.body;
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
      const product = await Products.findByPk(productID);
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
      const { productsID } = req.body;
      const product = await Products.findByPk(productsID);
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
