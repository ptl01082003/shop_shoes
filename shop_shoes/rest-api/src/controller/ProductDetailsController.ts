import { Request, Response, NextFunction } from "express";
import { ProductDetails } from "../models/ProductDetails";
import { SizeProductDetails } from "../models/SizeProductDetails";
import { Sizes } from "../models/Sizes"; // Assuming Sizes model exists in your project

const ProductDetailsController = {
  createProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, description, productId, sizes } = req.body;
      const newProductDetail = await ProductDetails.create({
        name,
        description,
        productId,
      });

      if (sizes && sizes.length > 0) {
        for (const size of sizes) {
          await SizeProductDetails.create({
            productDetailId: newProductDetail.productDetailId,
            sizeId: size.sizeId,
            quantity: size.quantity || 0,
          });
        }
      }

      res.status(201).json({
        message: "Created successfully",
        code: 0,
        data: newProductDetail,
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "Failed to create";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Failed to create",
        code: 1,
        error: errorMessage,
      });
    }
  },

  getAllProductDetails: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productDetails = await ProductDetails.findAll({
        include: [
          {
            model: SizeProductDetails,
            include: [Sizes],
          },
        ],
      });

      res.status(200).json({
        message: "Retrieved successfully",
        code: 0,
        data: productDetails,
      });
    } catch (error) {
      console.log(error);
      let errorMessage = "Failed to retrieve";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Failed to retrieve",
        code: 1,
        error: errorMessage,
      });
    }
  },

  getProductDetailById: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productDetailId } = req.body;
      const productDetail = await ProductDetails.findByPk(productDetailId, {
        include: [
          {
            model: SizeProductDetails,
            include: [Sizes],
          },
        ],
      });

      if (productDetail) {
        res.status(200).json({
          message: "Retrieved successfully",
          code: 0,
          data: productDetail,
        });
      } else {
        res.status(404).json({
          message: "Product detail not found",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Failed to retrieve";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Failed to retrieve",
        code: 1,
        error: errorMessage,
      });
    }
  },

  updateProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productDetailId } = req.body;
      const { name, description, sizes } = req.body;
      const productDetail = await ProductDetails.findByPk(productDetailId);

      if (productDetail) {
        await productDetail.update({
          name,
          description,
        });

        if (sizes && sizes.length > 0) {
          await SizeProductDetails.destroy({
            where: { productDetailId: productDetailId },
          });
          for (const size of sizes) {
            await SizeProductDetails.create({
              productDetailId: productDetailId,
              sizeId: size.sizeId,
              quantity: size.quantity || 0,
            });
          }
        }

        res.status(200).json({
          message: "Updated successfully",
          code: 0,
          data: productDetail,
        });
      } else {
        res.status(404).json({
          message: "Product detail not found",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Failed to update";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Failed to update",
        code: 1,
        error: errorMessage,
      });
    }
  },

  deleteProductDetail: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productDetailId } = req.body;
      const productDetail = await ProductDetails.findByPk(productDetailId);

      if (productDetail) {
        await SizeProductDetails.destroy({
          where: { productDetailId: productDetailId },
        });
        await productDetail.destroy();
        res.status(200).json({
          message: "Deleted successfully",
          code: 0,
        });
      } else {
        res.status(404).json({
          message: "Product detail not found",
          code: 1,
        });
      }
    } catch (error) {
      console.log(error);
      let errorMessage = "Failed to delete";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      res.status(401).json({
        message: "Failed to delete",
        code: 1,
        error: errorMessage,
      });
    }
  },

  addQuantity: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productDetailId, sizeId, quantity } = req.body;

      // Kiểm tra xem ProductDetail có tồn tại không
      const productDetail = await ProductDetails.findByPk(productDetailId);
      if (!productDetail) {
        return res.status(404).json({
          message: "Product detail not found",
          code: 1,
        });
      }

      // Kiểm tra xem Size có tồn tại không
      const size = await Sizes.findByPk(sizeId);
      if (!size) {
        return res.status(404).json({
          message: "Size not found",
          code: 1,
        });
      }

      const [sizeProductDetail, created] =
        await SizeProductDetails.findOrCreate({
          where: { productDetailId, sizeId },
          defaults: { quantity },
        });

      if (!created) {
        await sizeProductDetail.increment("quantity", { by: quantity });
        await sizeProductDetail.reload();
      }

      res.status(200).json({
        message: "Quantity added successfully",
        code: 0,
        data: sizeProductDetail,
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add quantity";
      res.status(400).json({
        message: "Failed to add quantity",
        code: 1,
        error: errorMessage,
      });
    }
  },

  updateQuantity: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productDetailId, sizeId, quantity } = req.body;

      // Kiểm tra xem ProductDetail có tồn tại không
      const productDetail = await ProductDetails.findByPk(productDetailId);
      if (!productDetail) {
        return res.status(404).json({
          message: "Product detail not found",
          code: 1,
        });
      }

      // Kiểm tra xem Size có tồn tại không
      const size = await Sizes.findByPk(sizeId);
      if (!size) {
        return res.status(404).json({
          message: "Size not found",
          code: 1,
        });
      }

      const sizeProductDetail = await SizeProductDetails.findOne({
        where: { productDetailId, sizeId },
      });

      if (!sizeProductDetail) {
        return res.status(404).json({
          message: "Size-ProductDetail combination not found",
          code: 1,
        });
      }

      await sizeProductDetail.update({ quantity });

      res.status(200).json({
        message: "Quantity updated successfully",
        code: 0,
        data: sizeProductDetail,
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update quantity";
      res.status(400).json({
        message: "Failed to update quantity",
        code: 1,
        error: errorMessage,
      });
    }
  },
  deleteQuantity: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productDetailId, sizeId } = req.body;

      const sizeProductDetail = await SizeProductDetails.findOne({
        where: { productDetailId, sizeId },
      });

      if (!sizeProductDetail) {
        return res.status(404).json({
          message: "Size-ProductDetail combination not found",
          code: 1,
        });
      }

      await sizeProductDetail.destroy();

      res.status(200).json({
        message: "Quantity record deleted successfully",
        code: 0,
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete quantity";
      res.status(400).json({
        message: "Failed to delete quantity",
        code: 1,
        error: errorMessage,
      });
    }
  },
};

export default ProductDetailsController;
