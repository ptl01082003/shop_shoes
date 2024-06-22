import { app } from "../app";
import express from "express";
import { uploadRouter } from "./uploadRouter";
import OriginRouter from "./OriginRouter";
import MaterialRouter from "./MaterialRouter";
import StyleRouter from "./StyleRouter";
import ColourRouter from "./ColourRouter";
import ProductLineRouter from "./ProductLineRouter";
import TrademarkRouter from "./TrademarkRouter";
import ProductRouter from "./ProductRouter";
import bodyParser from "body-parser";
import { checkAuth } from "../middleware/checkAuth";
import AnnouncementRouter from "./AnnouncementRouter";
import ReceiptNotificationRouter from "./ReceiptNotificationRouter";
import StaffRouter from "./StaffRouter";
import RoleRouter from "./RoleRouter";
import VoucherRouter from "./VoucherRouter";
import CustomerRouter from "./CustomerRouter";
import CustomerVouchersRouter from "./CustomerVouchersRouter";
import AddressRouter from "./AddressRouter";
import FavoriteListRouter from "./FavoriteListRouter";
import CartRouter from "./CartRouter";
import OrderRouter from "./OrderRouter";
import ProductDetailsRouter from "./ProductDetailsRouter";
import OrderDetailsRouter from "./OrderDetailsRouter";
import CommentRouter from "./CommentRouter";
import SizeRouter from "./SizeRouter";
import PromotionRouter from "./PromotionRouter";
import PromotionProductRouter from "./PromotionProductRouter";
import ImageRouter from "./ImageRouter";


const router = express.Router();

export function appRouter() {
  //PUBLIC ROUTER
  app.use(bodyParser.json());

  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  /////////////////////////////
  router.use("/image",ImageRouter);
  router.use("/promotion-product",PromotionProductRouter);
  router.use("/promotion",PromotionRouter);
  router.use("/size",SizeRouter);
  router.use("/comment",CommentRouter);
  router.use("/order-details",OrderDetailsRouter);
  router.use("/product-details",ProductDetailsRouter);
  router.use("/order",OrderRouter);
  router.use("/cart",CartRouter);
  router.use("/favorite-List",FavoriteListRouter);
  router.use("/address",AddressRouter);
  router.use("/customer-Vouchers",CustomerVouchersRouter);
  router.use("/customer", CustomerRouter);
  router.use("/voucher", VoucherRouter);
  router.use("/receipt-Notification", ReceiptNotificationRouter);
  router.use("/role", RoleRouter);
  router.use("/staff", StaffRouter);
  router.use("/announcement", AnnouncementRouter);
  router.use("/origin", OriginRouter);
  router.use("/material", MaterialRouter);
  router.use("/style", StyleRouter);
  router.use("/colour", ColourRouter);
  router.use("/productline", ProductLineRouter);
  router.use("/trademark", TrademarkRouter);
  router.use("/product", ProductRouter);
  router.use(checkAuth);
  router.use("/uploads", uploadRouter);

  //PRIVATE ROUTER

  app.use(`/api/${process.env.API_VERSION}`, router);
}
