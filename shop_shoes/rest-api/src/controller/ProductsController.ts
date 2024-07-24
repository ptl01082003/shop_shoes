import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Images } from "../models/Images";
import { ProductDetails } from "../models/ProductDetails";
import { Products } from "../models/Products";
import { SizeProductDetails } from "../models/SizeProductDetails";
import { Sizes } from "../models/Sizes";
import { Materials } from "../models/Materials";
import { Origins } from "../models/Origins";
import { Styles } from "../models/Styles";
import { Brands } from "../models/Brands";

const ProductsController = {
  addProduct: async (req: Request, res: Response, next: NextFunction) => {
    // try {
    //   const {
    //     name,
    //     importPrice,
    //     price,
    //     status,
    //     originId,
    //     styleId,
    //     materialId,
    //     brandId,
    //     gallery,
    //     sizes,
    //     productDetails,
    //   } = req.body;

    //   const products = await Products.create({
    //     name,
    //     importPrice,
    //     price,
    //     status,
    //     originId,
    //     styleId,
    //     materialId,
    //     brandId,
    //     gallery,
    //     sizes,
    //     productDetails,
    //   });

    //   console.log(req.body);
    //   const newProductDetails = await ProductDetails.create({
    //     productId: products.productId,
    //     description: productDetails,
    //   });
    //   console.log(newProductDetails);

    //   if (Array.isArray(gallery)) {
    //     for await (const path of gallery) {
    //       await Images.create({
    //         path,
    //         productId: products.productId,
    //       });
    //     }
    //   }

    //   if (Array.isArray(sizes)) {
    //     for await (const size of sizes) {
    //       await SizeProductDetails.create({
    //         productDetailId: newProductDetails.productDetailId,
    //         sizeId: size?.sizeId,
    //         quantity: size?.quantity,
    //       });
    //     }
    //   }
    //   console.log(sizes);

    //   res.json(
    //     ResponseBody({
    //       code: RESPONSE_CODE.SUCCESS,
    //       message: "Thực hiện thành công",
    //     })
    //   );
    // } catch (error) {
    //   console.log(error);
    //   next(error);
    // }
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
        productSizes,
        productDetails,
      } = req.body;

      // Tạo sản phẩm
      const product = await Products.create({
        name,
        importPrice,
        price,
        status,
        originId,
        styleId,
        materialId,
        brandId,
        gallery,
        productDetails,
      });

      // Tạo chi tiết sản phẩm
      const newProductDetails = await ProductDetails.create({
        productId: product.productId,
        description: productDetails,
      });

      // Thêm nhiều bản ghi vào bảng SizeProductDetails
      if (Array.isArray(productSizes)) {
        const sizeProductDetailsData = productSizes.map((size) => ({
          productDetailId: newProductDetails.productDetailId,
          sizeId: size.sizeId,
          quantity: size.quantity,
        }));

        await SizeProductDetails.bulkCreate(sizeProductDetailsData);
      }

      // Thêm hình ảnh vào bảng Images
      if (Array.isArray(gallery)) {
        const imagesData = gallery.map((path) => ({
          path,
          productId: product.productId,
        }));

        await Images.bulkCreate(imagesData);
      }

      res.json({
        code: RESPONSE_CODE.SUCCESS,
        message: "Thực hiện thành công",
      });
    } catch (error) {
      next(error);
    }
  },

  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Products.findAll({
        include: [
          {
            model: Materials,
            attributes: ["name"]
          },
          {
            model: Origins,
            attributes: ["name"]
          },
          {
            model: Styles,
            attributes: ["name"]
          },
          {
            model: Brands,
            attributes: ["name"]
          }
        ]
      });

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
          attributes: ["sizeId", "quantity"],
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
          productId: productId,
        },
      });
      const productDetails = await ProductDetails.findOne({
        where: { productId: productId },
        attributes: { include: ["description"] },
      });
      const sizes = await SizeProductDetails.findAll({
        where: { productId: products?.productId },
        include: [{ model: Sizes, attributes: ["name"] }],
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
