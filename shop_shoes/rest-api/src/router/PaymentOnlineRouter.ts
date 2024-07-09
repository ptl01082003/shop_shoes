// routes/origins.ts
import { Router } from "express";
import PaymentOnlineController from "../controller/PaymentOnlineController";

const vnpayRouter = Router();

vnpayRouter.get("/", PaymentOnlineController.order);
vnpayRouter.get("/check-out", PaymentOnlineController.checkout);
vnpayRouter.get("/momo", PaymentOnlineController.momo);


export default vnpayRouter;
