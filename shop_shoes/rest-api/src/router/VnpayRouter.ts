// routes/origins.ts
import { Router } from "express";
import VnpayController from "../controller/VnpayController";

const vnpayRouter = Router();

vnpayRouter.get("/", VnpayController.order);
vnpayRouter.get("/check-out", VnpayController.checkout);

export default vnpayRouter;
