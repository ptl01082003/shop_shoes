import { Request, Response, NextFunction } from "express";
import { Products } from "../models/Products";
import { Op } from "sequelize";
import { ProductDetails } from "../models/ProductDetails";
import { Images } from "../models/Images";
import { SizeProductDetails } from "../models/SizeProductDetails";
import { Sizes } from "../models/Sizes";
import { RESPONSE_CODE, ResponseBody } from "../constants";

const ProductsController = {
  addProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        productsName,
        productImportPrice,
        productPrice,
        status,
        originId,
        styleId,
        materialId,
        brandId,
        imageGallery,
        productSizes,
        productDetails,
      } = req.body;

      const product = await Products.create({
        productsName,
        productImportPrice,
        productPrice,
        status,
        originId,
        styleId,
        materialId,
        brandId,
      });

      const newProductDetails = await ProductDetails.create({
        productId: product.productsID,
        productDetaildescription: productDetails,
      });

      if (Array.isArray(imageGallery)) {
        for await (const imagePath of imageGallery) {
          await Images.create({
            imagePath,
            productID: product.productsID,
          });
        }
      }

      if (Array.isArray(productSizes)) {
        for await (const sizes of productSizes) {
          await SizeProductDetails.create({
            productDetailId: newProductDetails.productDetailid,
            sizeId: sizes?.sizeID,
            quantity: sizes?.quantity,
          });
        }
      }

      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          message: "Thực hiện thành công",
        })
      );
    } catch (error) {
      next(error);
    }
  },

  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productID, productCode } = req.query;
      const whereClause: any = {};

      if (productId) {
        whereClause.productsId = productId;
      }
      if (productCode) {
        whereClause.productCode = { [Op.like]: `%${productCode}%` };
      }

      const products = await Products.findAll({ where: whereClause });

      const transferData = [];

      for await (const product of products) {
        const productDetails = await ProductDetails.findOne({
          where: { productId: product.productsID },
          attributes: ["productDetaildescription", "productDetailid"],
        });

        const images = await Images.findAll({
          where: { productId: product.productId },
          attributes: ["imagePath"],
        });
        const productSizes = await SizeProductDetails.findAll({
          where: { productDetailId: productDetails?.productDetailid },
          attributes: ["sizeId", "quantity"],
        });

        transferData.push({
          productSizes,
          imageGallery: images,
          ...product?.toJSON(),
          ...productDetails?.toJSON(),
        });
      }

      res.json({
        message: "Thực hiện thành công",
        code: 0,
        data: transferData,
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.body;
      const product = await Products.findOne({
        where: {
          productsId: productId,
        },
      });
      const productDetails = await ProductDetails.findOne({
        where: { productId: productId },
        attributes: { include: ["productDetaildescription"] },
      });
      const sizes = await SizeProductDetails.findAll({
        where: { productId: product?.productId },
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
      const { productId } = req.body;
      const {
        productsName,
        productImportPrice,
        productPrice,
        status,
        display,
        originId,
        styleId,
        materialId,
        brandId,
      } = req.body;
      const product = await Products.findByPk(productId);
      if (product) {
        await product.update({
          productsName,
          productImportPrice,
          productPrice,
          status,
          display,
          originId,
          styleId,
          materialId,
          brandId,
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
      next(error);
    }
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productsID } = req.body;
      const product = await Products.findOne({ where: { productsID } });
      if (product) {
        await Images.destroy({
          where: { productID: productsID },
        });
        await ProductDetails.destroy({
          where: { productId: productsID },
        });
        await product.destroy();
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            data: null,
            message: "Thực hiện thành công",
          })
        );
      } else {
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            data: null,
            message: "Không tồn tại sản phẩm",
          })
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default ProductsController;
