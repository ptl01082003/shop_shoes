import { Vouchers } from './../models/Vouchers';
// routes/origins.ts
import { Router } from "express";
import PaymentOnlineController from "../controller/PaymentOnlineController";

const paymentRouter = Router();

paymentRouter.get("/", PaymentOnlineController.order);
paymentRouter.get("/momo", PaymentOnlineController.momo);
paymentRouter.get("/check-out-vnpay", PaymentOnlineController.checkoutVnpay);
paymentRouter.get("/check-out-momo", PaymentOnlineController.checkoutMomo);

export default paymentRouter;
