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
      const [newCarts, created] = await ShoppingCarts.findOrCreate({
        where: { userId },
        include: [CartItems],
      });
      // tính giá sản phẩm thực tế dựa trên số lượng và id
      if (Array.isArray(cartItems) && cartItems.length > 0) {
        for await (let items of cartItems) {
          const quanity = items.quanity;
          const productsID = items.productsID;
          const product = await Products.findOne({ where: items.productsID });
          if (product) {
            cartTotals += (Number(product.productPrice) || 0) * quanity;
            const [cartProducts] = await CartItems.findOrCreate({
              where: { productsID, cartId: newCarts.cartId },
            });
            if (cartProducts) {
              cartProducts.quanity = quanity;
              cartProducts.save();
            }
          }
        }
      }
      // cập nhật giá của giỏ hàng
      newCarts.totals = cartTotals;
      newCarts.save();

      const getNewCarts = await ShoppingCarts.findOne({
        where: { userId, cartId: newCarts.cartId },
        include: {
          model: CartItems,
          include: [Products],
        },
      });
      await redis.set(`carts-${userId}`, JSON.stringify(getNewCarts));
      res.json(
        ResponseBody({
          code: RESPONSE_CODE.SUCCESS,
          message: `${created ? "Tạo mới" : "Cập nhật"} giỏ hàng thành công`,
        })
      );
    } catch (error) {
      next(error);
    }
  },
  remove: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { productsID } = req.body;
    const carts = await ShoppingCarts.findOne({
      where: { userId },
      include: {
        model: CartItems,
      },
    });
    if(carts) {
      if (Array.isArray(carts?.cartItems) && carts?.cartItems.length > 0) {
        const products = carts.cartItems.find(
          (items) => items.productsID === productsID
        );
        products?.destroy();
      }
      carts.totals =  carts.cartItems.reduce((pre, items) => {
      return pre + (items.productsID === productsID ? 0 : 
        items.quanity
      );
      },0);
    await  carts.save();
    }
    
    res.status(STATUS_CODE.SUCCESS).json(
      ResponseBody({
        code: RESPONSE_CODE.SUCCESS,
        message: `Thực hiện thành công`,
      })
    );
  },
  lstCarts: async (req: Request, res: Response, next: NextFunction) => {
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
      include: {
        model: CartItems,
        include: [Products],
      },
    });
    await redis.set(`carts-${userId}`, JSON.stringify(cartsInDatabase));
    res.status(STATUS_CODE.SUCCESS).json(
      ResponseBody({
        code: RESPONSE_CODE.SUCCESS,
        data: cartsInDatabase,
        message: `Thực hiện thành công`,
      })
    );
  },
};

export default CartsController;
