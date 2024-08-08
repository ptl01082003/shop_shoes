// controllers/OriginsController.ts
import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE, ResponseBody } from "../constants";
import { Images } from "../models/Images";
import { OrderDetails } from "../models/OrderDetails";
import { OrderItems } from "../models/OrderItems";
import {
  PAYMENT_STATUS,
  PaymentDetails
} from "../models/PaymentDetails";
import { ProductDetails } from "../models/ProductDetails";
import { Products } from "../models/Products";
import { Sizes } from "../models/Sizes";

const OrdersController = {

  getLstOders: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { status } = req.body;
      const userId = req.userId;
      const where: any = { userId };
      if (status) {
        where["status"] = status;
      }
      const orderItems = await OrderItems.findAll({
        where,
        include: [
          {
            model: ProductDetails,
            include: [
              {
                model: Products,
                include: [
                  {
                    model: Images,
                  },
                ],
              },
              {
                model: Sizes,
              },
            ],
          },
          {
            model: OrderDetails,
          }
        ],
      });
      if (orderItems) {
        let transferData: any[] = [];
        for await (const orders of orderItems) {
          const payments = await PaymentDetails.findOne({
            where: { orderDetailId: orders.orderDetailId }
          })
          const isPaid = payments?.status === PAYMENT_STATUS.SUCCESS;
          transferData.push({
            status: orders.status,
            isReview: orders.isReview,
            paymentStatus: payments?.status,
            price: isPaid ? orders.price : orders.productDetails.products.price,
            amount: isPaid ? orders?.amount : orders.quanity * Number(orders.productDetails.products.priceDiscount),
            quanity: orders?.quanity,
            priceDiscount: isPaid ? orders.priceDiscount : orders.productDetails.products.priceDiscount,
            productDetailId: orders?.productDetailId,
            name: orders?.productDetails?.products?.name,
            sizeName: orders?.productDetails?.sizes?.name,
            quanityLimit: orders?.productDetails?.quantity,
            path: orders?.productDetails?.products?.gallery?.[0]?.path,
          })
        }

        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: "Thực hiện thành công",
            data: transferData,
          })
        );
      } else {
        res.json(
          ResponseBody({
            code: RESPONSE_CODE.SUCCESS,
            message: "Bạn chưa mua sản phẩm",
            data: [],
          })
        );
      }

    } catch (error) {
      next(error);
    }
  },
};

export default OrdersController;
