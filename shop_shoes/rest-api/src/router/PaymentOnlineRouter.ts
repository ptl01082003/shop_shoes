import { Vouchers } from "./../models/Vouchers";
// routes/origins.ts
import { Router } from "express";
import PaymentOnlineController from "../controller/PaymentOnlineController";
import { checkAuth } from "../middleware/checkAuth";

const paymentRouter = Router();

paymentRouter.use(checkAuth);

paymentRouter.get("/", PaymentOnlineController.order);
paymentRouter.get("/create-momo", PaymentOnlineController.createMomo);
paymentRouter.post("/create-order", PaymentOnlineController.createOrder);
paymentRouter.get("/check-out-momo", PaymentOnlineController.checkoutMomo);
paymentRouter.get("/check-out-vnpay", PaymentOnlineController.checkoutVnpay);

export default paymentRouter;
