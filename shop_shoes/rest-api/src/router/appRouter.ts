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
  /////////////////////////////\

  router.use("/anh",ImageRouter);
  router.use("/khuyenmai-sanpham",PromotionProductRouter);
  router.use("/khuyen-mai",PromotionRouter);
  router.use("/size",SizeRouter);
  router.use("/nhan-xet",CommentRouter);
  router.use("/donhang-chitiet",OrderDetailsRouter);
  router.use("/sanpham-chitiet",ProductDetailsRouter);
  router.use("/don-hang",OrderRouter);
  router.use("/gio-hang",CartRouter);
  router.use("/ds-yeuthich",FavoriteListRouter);
  router.use("/dia-chi",AddressRouter);
  router.use("/voucher-khachhang",CustomerVouchersRouter);
  router.use("/khach-hang", CustomerRouter);
  router.use("/voucher", VoucherRouter);
  router.use("/thongbao-nhan", ReceiptNotificationRouter);
  router.use("/vai-tro", RoleRouter);
  router.use("/nhan-vien", StaffRouter);
  router.use("/thong-bao", AnnouncementRouter);
  router.use("/xuat-xu", OriginRouter);
  router.use("/chat-lieu", MaterialRouter);
  router.use("/kieu-dang", StyleRouter);
  router.use("/mau-sac", ColourRouter);
  router.use("/dong-sp", ProductLineRouter);
  router.use("/thuong-hieu", TrademarkRouter);
  router.use("/san-pham", ProductRouter);
  router.use(checkAuth);
  router.use("/uploads", uploadRouter);

  //PRIVATE ROUTER

  app.use(`/api/${process.env.API_VERSION}`, router);
}
