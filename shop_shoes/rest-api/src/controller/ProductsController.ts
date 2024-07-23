import { Request, Response, NextFunction } from "express";
import { Products } from "../models/Products";
import { Op } from "sequelize";
import { ProductDetails } from "../models/ProductDetails";
import { Images } from "../models/Images";
import { SizeProductDetails } from "../models/SizeProductDetails";
import { Sizes } from "../models/Sizes";

const ProductsController = {
  // addProduct: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const {
  //       productsName,
  //       productImportPrice,
  //       productPrice,
  //       status,
  //       display,
  //       originId,
  //       styleId,
  //       materialId,
  //       brandId,
  //       imageGallery,
  //       productDetails,
  //       sizeQuantities,
  //     } = req.body;
  //     const product = await Products.create({
  //       productsName,
  //       productImportPrice,
  //       productPrice,
  //       status,
  //       display,
  //       originId,
  //       styleId,
  //       materialId,
  //       brandId,
  //     });
  //     await ProductDetails.create({
  //       productId: product.productsId,
  //       productDetaildescription: productDetails,
  //     });
  //     if (Array.isArray(imageGallery)) {
  //       for await (const images of imageGallery) {
  //         await Images.create({
  //           productId: product.productsId,
  //           imagePath: images,
  //         });
  //       }
  //     }
  //     if (Array.isArray(sizeQuantities)) {
  //       for await (const { sizeId, quantity } of sizeQuantities) {
  //         await SizeProductDetails.create({
  //           productId: product.productsId,
  //           sizeId: sizeId,
  //           quantity: quantity,
  //         });
  //       }
  //     }
  //     res.json({
  //       message: "Thực hiện thành công",
  //       code: 0,
  //       data: product,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     let errorMessage = "Thực hiện thất bại";
  //     if (error instanceof Error) {
  //       errorMessage = error.message;
  //     }
  //     res.status(401).json({
  //       message: "Thực hiện thất bại",
  //       code: 1,
  //       error: errorMessage,
  //     });
  //   }
  // },
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
        productDetails,
      } = req.body;

      // Tạo sản phẩm mới
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

      // Tạo chi tiết sản phẩm
      if (productDetails) {
        await ProductDetails.create({
          productId: product.productId,
          productDetaildescription: productDetails,
        });
      }

      // Thêm hình ảnh
      if (Array.isArray(imageGallery)) {
        for (const imagePath of imageGallery) {
          await Images.create({
            productId: product.productId,
            imagePath,
          });
        }
      }

      // Thêm kích thước và số lượng
      if (Array.isArray(req.body.productDetails)) {
        for (const detail of req.body.productDetails) {
          await SizeProductDetails.create({
            productId: product.productId,
            sizeId: detail.sizeId,
            quantity: detail.quantity,
          });
        }
      }

      // Lấy sản phẩm vừa tạo cùng với tất cả thông tin liên quan
      const createdProduct = await Products.findByPk(product.productId, {
        include: [
          { model: ProductDetails },
          { model: Images },
          { model: SizeProductDetails, include: [Sizes] },
        ],
      });

      res.status(201).json({
        message: "Thêm sản phẩm thành công",
        code: 0,
        data: createdProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Có lỗi xảy ra khi thêm sản phẩm",
        code: 1,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  // Các phương thức khác giữ nguyên hoặc cập nhật nếu cần

  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productId, productCode, productsName } = req.query;
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
          where: { productId: product.productId },
          attributes: ["productDetaildescription"],
        });
        const images = await Images.findAll({
          where: { productId: product.productId },
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
      const { productsId } = req.body;
      const product = await Products.findByPk(productsId);
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
