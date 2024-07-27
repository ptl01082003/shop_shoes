import { NextFunction, Request, Response } from "express";
import { ShoppingCarts } from "../models/ShoppingCarts";
import { Products } from "../models/Products";
import { redis } from "../config/ConnectRedis";
import { CartItems } from "../models/CartItems";
import { RESPONSE_CODE, ResponseBody, STATUS_CODE } from "../constants";
import { ProductDetails } from "../models/ProductDetails";
import { Images } from "../models/Images";
import { Sizes } from "../models/Sizes";

const CartsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const { productDetailId, quanity } = req.body;

      let cartTotals = 0;
      let cartsAmount = 0;

      const [carts] = await ShoppingCarts.findOrCreate({
        where: { userId },
      });

      const productDetails = await ProductDetails.findOne({
        where: { productDetailId },
        include: {
          model: Products,
        },
      });

      if (productDetails) {
        const isExceedQuanity = productDetails.quantity < quanity;
        const actualQuanity = isExceedQuanity
          ? productDetails.quantity
          : quanity;
        const amount =
          actualQuanity * Number(productDetails.products.priceDiscount);

        const [cartIitems] = await CartItems.findOrCreate({
          where: { productDetailId, cartId: carts.cartId },
        });

        cartIitems.amount = amount;
        cartIitems.quanity = actualQuanity;
        await cartIitems.save();

        const lstCartsItems = await CartItems.findAll({
          where: { cartId: carts.cartId },
        });

        lstCartsItems.forEach((cartItems) => {
          (cartTotals += cartItems.quanity), (cartsAmount += cartItems.amount);
        });

        carts.amount = cartsAmount;
        carts.totals = cartTotals;

        await carts.save();

        const currentCarts = await ShoppingCarts.findOne({
          where: { userId },
          attributes: ["totals", "amount"],
          include: [
            {
              model: CartItems,
              attributes: ["quanity", "amount"],
              include: [
                {
                  model: ProductDetails,
                  attributes: ["productId", "sizeId"],
                  include: [
                    {
                      model: Products,
                      attributes: ["priceDiscount", "name"],
                      include: [
                        {
                          model: Images,
                          attributes: ["path"],
                        },
                      ],
                    },
                    {
                      model: Sizes,
                      attributes: ["name"],
                    },
                  ],
                },
              ],
            },
          ],
        });

        await redis.set(`carts-${userId}`, JSON.stringify(currentCarts));
        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            message: isExceedQuanity
              ? `Bạn chỉ có thể thêm tối đa ${productDetails.quantity} sản phẩm`
              : "Thực hiện thành công",
            data: {
              amount,
              productDetailId,
              quanity: actualQuanity,
            },
          })
        );
      } else {
        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            message: `Sản phẩm không tồn tại`,
          })
        );
      }
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response) => {
    const userId = req.userId;
    const { productDetailId } = req.body;

    const carts = await ShoppingCarts.findOne({ where: { userId } });
    const cartsItems = await CartItems.findOne({
      where: { productDetailId, cartId: carts?.cartId },
    });
    if (carts) {
      if (cartsItems) {
        if (cartsItems.quanity > 1) {
          cartsItems.quanity -= 1;
          await cartsItems.save();
        } else {
          await cartsItems.destroy();
        }

        let cartsAmount = 0;

        const products = await CartItems.findAll({
          where: { cartId: carts?.cartId },
          include: [Products],
        });
        // products.forEach((product) => {
        //   cartsAmount +=
        //     (Number(product.products.price) || 0) * product.quanity;
        // });
        carts.amount = cartsAmount;
        carts.totals -= 1;

        await carts.save();

        const getCarts = await ShoppingCarts.findOne({
          where: { userId },
          attributes: ["totals", "amount"],
          include: {
            model: CartItems,
            attributes: ["quanity"],
            include: [
              {
                model: Products,
                attributes: ["productPrice", "productsName"],
              },
            ],
          },
        });

        await redis.set(`carts-${userId}`, JSON.stringify(getCarts));

        return res.status(STATUS_CODE.SUCCESS).json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: `Thực hiện thành công`,
          })
        );
      } else {
        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.ERRORS,
            message: `Sản phẩm không tồn tại không giỏ hàng`,
          })
        );
      }
    } else {
      return res.json(
        ResponseBody({
          code: RESPONSE_CODE.ERRORS,
          message: `Giỏ hàng chưa được tạo`,
        })
      );
    }
  },

  lstCarts: async (req: Request, res: Response) => {
    const userId = req.userId;
    const cartsInRedis = await redis.get(`carts-${userId}`);
    if (cartsInRedis) {
      return res.status(STATUS_CODE.SUCCESS).json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: JSON.parse(cartsInRedis),
          message: `Thực hiện thành công`,
        })
      );
    }
    const currentCartsInDb = await ShoppingCarts.findOne({
      where: { userId },
      attributes: ["totals", "amount"],
      include: [
        {
          model: CartItems,
          attributes: ["quanity", "amount"],
          include: [
            {
              model: ProductDetails,
              attributes: ["productId", "sizeId"],
              include: [
                {
                  model: Products,
                  attributes: ["priceDiscount", "name"],
                  include: [
                    {
                      model: Images,
                      attributes: ["path"],
                    },
                  ],
                },
                {
                  model: Sizes,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
    });
    await redis.set(`carts-${userId}`, JSON.stringify(currentCartsInDb));
    return res.status(STATUS_CODE.SUCCESS).json(
      ResponseBody({
        code: RESPONSE_CODE.SUCCESS,
        data: currentCartsInDb,
        message: `Thực hiện thành công`,
      })
    );
  },
};

export default CartsController;
