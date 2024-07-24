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
        name,
        importPrice,
        price,
        status,
        originId,
        styleId,
        materialId,
        brandId,
        gallery,
        sizes,
        productDetails,
      } = req.body;

      const products = await Products.create({
        name,
        importPrice,
        price,
        status,
        originId,
        styleId,
        materialId,
        brandId,
        gallery,
        sizes,
        productDetails,
      });

      const newProductDetails = await ProductDetails.create({
        productId: products.productId,
        productDetaildescription: productDetails,
      });

      if (Array.isArray(gallery)) {
        for await (const imagePath of gallery) {
          await Images.create({
            imagePath,
            productId: products.productId,
          });
        }
      }

      if (Array.isArray(sizes)) {
        for await (const size of sizes) {
          await SizeProductDetails.create({
            productDetailId: newProductDetails.productDetailId,
            sizeId: size?.sizeID,
            quantity: size?.quantity,
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

      const products = await Products.findAll();

      const transferData = [];

      for await (const product of products) {
        const productDetails = await ProductDetails.findOne({
          where: { productId: product.productId },
          attributes: ["description", "productDetailId"],
        });

        const images = await Images.findAll({
          where: { productId: product.productId },
          attributes: ["path"],
        });
        const sizes = await SizeProductDetails.findAll({
          where: { productDetailId: productDetails?.productDetailId },
          attributes: ["sizeID", "quantity"],
        });

        transferData.push({
          sizes,
          gallery: images,
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
      const products = await Products.findOne({
        where: {
          productsId: productId,
        },
      });
      const productDetails = await ProductDetails.findOne({
        where: { productId: productId },
        attributes: { include: ["productDetaildescription"] },
      });
      const sizes = await SizeProductDetails.findAll({
        where: { productId: products?.productId },
        include: [{ model: Sizes, attributes: ["sizeName"] }],
      });
      if (products) {
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: {
            ...products,
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
        name,
        importPrice,
        price,
        status,
        originId,
        styleId,
        materialId,
        brandId,
        gallery,
        sizes,
        productDetails,
      } = req.body;
      const products = await Products.findByPk(productId);
      if (products) {
        await products.update({
          name,
          importPrice,
          price,
          status,
          originId,
          styleId,
          materialId,
          brandId,
          gallery,
          sizes,
          productDetails,
        });
        res.status(200).json({
          message: "Thực hiện thành công",
          code: 0,
          data: products,
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
      const { productId } = req.body;
      const products = await Products.findOne({ where: { productId } });
      if (products) {
        await Images.destroy({
          where: { productId: productId },
        });
        await ProductDetails.destroy({
          where: { productId: productId },
        });
        await products.destroy();
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
