import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE } from "../constants";
import { Images } from "../models/Images";
import { ProductDetails } from "../models/ProductDetails";
import { Products } from "../models/Products";
import { Sizes } from "../models/Sizes";
import { Materials } from "../models/Materials";
import { Origins } from "../models/Origins";
import { Styles } from "../models/Styles";
import { Brands } from "../models/Brands";

const ProductsController = {
  // addProduct: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const {
  //       name,
  //       importPrice,
  //       price,
  //       status,
  //       originId,
  //       styleId,
  //       materialId,
  //       brandId,
  //       gallery,
  //       productDetails, // Mảng chi tiết sản phẩm, mỗi chi tiết bao gồm size và quantity
  //       description,
  //     } = req.body;

  //     // Tạo sản phẩm
  //     const product = await Products.create({
  //       name,
  //       importPrice,
  //       price,
  //       status,
  //       originId,
  //       styleId,
  //       materialId,
  //       brandId,
  //       description,
  //     });

  //     // Tạo chi tiết sản phẩm (bao gồm kích thước và số lượng)
  //     if (Array.isArray(productDetails)) {
  //       const productDetailsData = productDetails.map((detail) => ({
  //         productId: product.productId,
  //         sizeId: detail.sizeId,
  //         quantity: detail.quantity,
  //       }));

  //       await ProductDetails.bulkCreate(productDetailsData);
  //     }

  //     // Thêm hình ảnh vào bảng Images
  //     if (Array.isArray(gallery)) {
  //       const imagesData = gallery.map((path) => ({
  //         path,
  //         productId: product.productId,
  //       }));

  //       await Images.bulkCreate(imagesData);
  //     }

  //     res.json({
  //       code: RESPONSE_CODE.SUCCESS,
  //       message: "Thực hiện thành công",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
  // addProduct: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const {
  //       name,
  //       importPrice,
  //       price,
  //       status,
  //       originId,
  //       styleId,
  //       materialId,
  //       brandId,
  //       gallery,
  //       productDetails,
  //       description,
  //     } = req.body;

  //     // Tạo sản phẩm
  //     const product = await Products.create({
  //       name,
  //       importPrice,
  //       price,
  //       status,
  //       originId,
  //       styleId,
  //       materialId,
  //       brandId,
  //       description,
  //     });

  //     // Tạo chi tiết sản phẩm nếu chưa tồn tại
  //     if (Array.isArray(productDetails)) {
  //       for (const detail of productDetails) {
  //         await ProductDetails.findOrCreate({
  //           where: {
  //             productId: product.productId,
  //             sizeId: detail.sizeId,
  //           },
  //           defaults: {
  //             quantity: detail.quantity,
  //           },
  //         });
  //       }
  //     }

  //     // Thêm hình ảnh vào bảng Images
  //     if (Array.isArray(gallery)) {
  //       const imagesData = gallery.map((path: string) => ({
  //         path,
  //         productId: product.productId,
  //       }));

  //       await Images.bulkCreate(imagesData);
  //     }

  //     res.json({
  //       code: RESPONSE_CODE.SUCCESS,
  //       message: "Thực hiện thành công",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
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
        productDetails,
        description,
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
        description,
      });

      console.log("Product created:", product);

      // Tạo chi tiết sản phẩm
      if (Array.isArray(productDetails)) {
        const productDetailsData = productDetails.map((detail: any) => ({
          productId: product.productId,
          sizeId: detail.sizeId,
          quantity: detail.quantity,
        }));

        await ProductDetails.bulkCreate(productDetailsData);
        console.log("Product details created:", productDetailsData);
      }

      // Thêm hình ảnh vào bảng Images
      if (Array.isArray(gallery)) {
        const imagesData = gallery.map((path: string) => ({
          path,
          productId: product.productId,
        }));

        await Images.bulkCreate(imagesData);
        console.log("Images created:", imagesData);
      }

      res.json({
        code: RESPONSE_CODE.SUCCESS,
        message: "Thực hiện thành công",
      });
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  },
  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Products.findAll({
        include: [
          {
            model: Materials,
            attributes: ["name"],
          },
          {
            model: Origins,
            attributes: ["name"],
          },
          {
            model: Styles,
            attributes: ["name"],
          },
          {
            model: Brands,
            attributes: ["name"],
          },
        ],
      });

      const transferData = [];

      for await (const product of products) {
        const productDetails = await ProductDetails.findAll({
          where: { productId: product.productId },
          attributes: ["sizeId", "quantity"],
          include: [{ model: Sizes, attributes: ["name"] }],
        });

        const images = await Images.findAll({
          where: { productId: product.productId },
          attributes: ["path"],
        });

        transferData.push({
          ...product.toJSON(),
          productDetails: productDetails.map((productDetails) => ({
            productId: productDetails.productId,
            sizeId: productDetails.sizeId,
            quantity: productDetails.quantity,
          })),
          gallery: images,
        });
      }

      res.json({
        message: "Thực hiện thành công",
        code: RESPONSE_CODE.SUCCESS,
        data: transferData,
      });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.params;
      const product = await Products.findOne({
        where: { productId },
        include: [
          { model: Materials, attributes: ["name"] },
          { model: Origins, attributes: ["name"] },
          { model: Styles, attributes: ["name"] },
          { model: Brands, attributes: ["name"] },
        ],
      });

      if (!product) {
        return res.status(404).json({
          message: "Sản phẩm không tồn tại",
          code: RESPONSE_CODE.ERRORS,
        });
      }

      const productDetails = await ProductDetails.findAll({
        where: { productId },
        include: [{ model: Sizes, attributes: ["name"] }],
      });

      const images = await Images.findAll({
        where: { productId },
        attributes: ["path"],
      });

      res.json({
        message: "Thực hiện thành công",
        code: RESPONSE_CODE.SUCCESS,
        data: {
          ...product.toJSON(),
          productDetails: productDetails.map((productDetails) => ({
            productId: productDetails.productId,
            sizeId: productDetails.sizeId,
            quantity: productDetails.quantity,
          })),
          gallery: images,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        productId,
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
        description,
      } = req.body;

      const product = await Products.findOne({ where: { productId } });

      if (!product) {
        return res.status(404).json({
          message: "Sản phẩm không tồn tại",
          code: RESPONSE_CODE.ERRORS,
        });
      }

      await product.update({
        name,
        importPrice,
        price,
        status,
        originId,
        styleId,
        materialId,
        brandId,
        description,
      });

      if (Array.isArray(productDetails)) {
        for (const detail of productDetails) {
          const productDetail = await ProductDetails.findOne({
            where: {
              productId: product.productId,
              sizeId: detail.sizeId,
            },
          });

          if (productDetail) {
            await productDetail.update({
              quantity: detail.quantity,
            });
          } else {
            await ProductDetails.create({
              productId: detail.productId,
              sizeId: detail.sizeId,
              quantity: detail.quantity,
            });
          }
        }
      }

      // Cập nhật hình ảnh
      await Images.destroy({
        where: { productId },
      });

      if (Array.isArray(gallery)) {
        const imagesData = gallery.map((path) => ({
          path,
          productId,
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

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId } = req.body;
      const product = await Products.findOne({ where: { productId } });

      if (!product) {
        return res.status(404).json({
          message: "Sản phẩm không tồn tại",
          code: RESPONSE_CODE.ERRORS,
        });
      }

      await Images.destroy({
        where: { productId },
      });

      await ProductDetails.destroy({
        where: { productId },
      });

      await product.destroy();

      res.json({
        code: RESPONSE_CODE.SUCCESS,
        message: "Thực hiện thành công",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default ProductsController;
