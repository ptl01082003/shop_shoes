import { NextFunction, Request, Response } from "express";
import { ShoppingCarts } from "../models/ShoppingCarts";
import { Products } from "../models/Products";
import { redis } from "../config/ConnectRedis";
import { CartItems } from "../models/CartItems";
import { RESPONSE_CODE, ResponseBody, STATUS_CODE } from "../constants";

const CartsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;
      const { cartItems } = req.body;

      let cartTotals = 0;
      let cartsAmounts = 0;

      const [instanceCarts, created] = await ShoppingCarts.findOrCreate({
        where: { userId },
        include: [CartItems],
      });

      if (Array.isArray(cartItems) && cartItems.length > 0) {
        for await (const items of cartItems) {
          const quanity = items.quanity;
          const productsId = items.productsId;
          const [cartProducts] = await CartItems.findOrCreate({
            where: { productsId, cartId: instanceCarts.cartId },
          });
          if (cartProducts) {
            cartTotals += quanity;
            cartProducts.quanity = quanity;
            await cartProducts.save();
          }
        }
      }

      // cập nhật giá của giỏ hàng
      const carts = await CartItems.findAll({
        where: { cartId: instanceCarts?.cartId },
        include: [Products],
      });
      // carts.forEach((items) => {
      //   cartsAmounts += (Number(items.products.price) || 0) * items.quanity;
      // });

      instanceCarts.totals = cartTotals;
      instanceCarts.amount = cartsAmounts;

      await instanceCarts.save();

      const currentCarts = await ShoppingCarts.findOne({
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

      await redis.set(`carts-${userId}`, JSON.stringify(currentCarts));

      return res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          message: `${created ? "Tạo mới" : "Cập nhật"} giỏ hàng thành công`,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  remove: async (req: Request, res: Response) => {
    const userId = req.userId;
    const { productsId } = req.body;

    const carts = await ShoppingCarts.findOne({ where: { userId } });
    const cartsItems = await CartItems.findOne({
      where: { productsId, cartId: carts?.cartId },
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
    const cartsInDatabase = await ShoppingCarts.findOne({
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
    await redis.set(`carts-${userId}`, JSON.stringify(cartsInDatabase));
    return res.status(STATUS_CODE.SUCCESS).json(
      ResponseBody({
        code: RESPONSE_CODE.SUCCESS,
        data: cartsInDatabase,
        message: `Thực hiện thành công`,
      })
    );
  },
};

export default CartsController;
