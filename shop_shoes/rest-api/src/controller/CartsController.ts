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
          attributes: ["productDetailId", "quanity", "amount"],
          include: [
            {
              model: ProductDetails,
              include: [
                {
                  model: Products,
                  attributes: ["priceDiscount", "name", "price"],
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
        });

        lstCartsItems.forEach((cartItems) => {
          cartTotals += cartItems.quanity;
          cartsAmount += cartItems.amount;
        });

        carts.amount = cartsAmount;
        carts.totals = cartTotals;

        await carts.save();

        let transferCarts: { [key: string]: any } = {};

        transferCarts = { ...carts?.toJSON() };

        transferCarts["cartItems"] = lstCartsItems.map((cartItems) => {
          return {
            quanity: cartItems?.quanity,
            amount: cartItems?.amount,
            productDetailId: cartItems?.productDetailId,
            name: cartItems?.productDetails?.products?.name,
            sizeName: cartItems?.productDetails?.sizes?.name,
            price: cartItems?.productDetails?.products?.price,
            quanityLimit: cartItems?.productDetails?.quantity,
            path: cartItems?.productDetails?.products?.gallery?.[0]?.path,
            priceDiscount: cartItems?.productDetails?.products?.priceDiscount,
          };
        });
        console.log(transferCarts);
        await redis.set(`carts-${userId}`, JSON.stringify(transferCarts));

        return res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: isExceedQuanity
              ? `Bạn chỉ có thể thêm tối đa ${productDetails.quantity} sản phẩm`
              : "Thực hiện thành công",
            data: {
              amount,
              cartTotals,
              cartsAmount,
              productDetailId,
              carts: transferCarts,
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

    let cartTotals = 0;
    let cartsAmount = 0;

    const carts = await ShoppingCarts.findOne({ where: { userId } });

    await CartItems.destroy({
      where: {
        productDetailId,
        cartId: carts?.cartId,
      },
    });

    let transferCarts: { [key: string]: any } = {};

    const currentCard = await ShoppingCarts.findOne({
      where: { userId },
      attributes: ["totals", "amount", "cartId"],
    });
    if (currentCard) {
      const lstCartsItems = await CartItems.findAll({
        where: { cartId: currentCard.cartId },
      });

      lstCartsItems.forEach((cartItems) => {
        (cartTotals += cartItems.quanity), (cartsAmount += cartItems.amount);
      });

      currentCard.amount = cartsAmount;
      currentCard.totals = cartTotals;

      await currentCard.save();

      transferCarts = { ...currentCard?.toJSON() };
      delete transferCarts["cartId"];

      const productItems = await CartItems.findAll({
        where: { cartId: currentCard?.cartId },
        attributes: ["productDetailId", "quanity", "amount"],
        include: [
          {
            model: ProductDetails,
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
      });

      transferCarts["cartItems"] = productItems.map((products) => {
        return {
          quanity: products?.quanity,
          amount: products?.amount,
          productDetailId: products?.productDetailId,
          name: products?.productDetails?.products?.name,
          sizeName: products?.productDetails?.sizes?.name,
          quanityLimit: products?.productDetails?.quantity,
          price: products?.productDetails?.products?.price,
          path: products?.productDetails?.products?.gallery?.[0]?.path,
          priceDiscount: products?.productDetails?.products?.priceDiscount,
        };
      });

      await redis.set(`carts-${userId}`, JSON.stringify(transferCarts));
      return res.json(
        ResponseBody({
          data: transferCarts,
          code: RESPONSE_CODE.SUCCESS,
          message: `Thực hiện thành công`,
        })
      );
    } else {
      return res.json(
        ResponseBody({
          data: null,
          code: RESPONSE_CODE.ERRORS,
          message: `Giỏ hàng của bạn đang trống`,
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
    let transferCarts: { [key: string]: any } = {};

    const currentCard = await ShoppingCarts.findOne({
      where: { userId },
      attributes: ["totals", "amount", "cartId"],
    });

    if (currentCard) {
      transferCarts = { ...currentCard?.toJSON() };
      const productItems = await CartItems.findAll({
        where: { cartId: currentCard?.cartId },
        attributes: ["productDetailId", "quanity", "amount"],
        include: [
          {
            model: ProductDetails,
            include: [
              {
                model: Products,
                attributes: ["priceDiscount", "name", "price"],
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
      });

      transferCarts["cartItems"] = productItems.map((products) => {
        return {
          quanity: products?.quanity,
          amount: products?.amount,
          productDetailId: products?.productDetailId,
          name: products?.productDetails?.products?.name,
          sizeName: products?.productDetails?.sizes?.name,
          quanityLimit: products?.productDetails?.quantity,
          price: products?.productDetails?.products?.price,
          path: products?.productDetails?.products?.gallery?.[0]?.path,
          priceDiscount: products?.productDetails?.products?.priceDiscount,
        };
      });

      await redis.set(`carts-${userId}`, JSON.stringify(transferCarts));
      return res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          data: transferCarts,
          message: `Thực hiện thành công`,
        })
      );
    } else {
      return res.json(
        ResponseBody({
          code: RESPONSE_CODE.ERRORS,
          data: null,
          message: `Giỏ hàng của bạn đang trống`,
        })
      );
    }
  },
};

export default CartsController;
