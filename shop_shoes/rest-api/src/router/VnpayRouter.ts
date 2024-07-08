// routes/origins.ts
import { Router } from "express";
import VnpayController from "../controller/VnpayController";

const vnpayRouter = Router();

vnpayRouter.get("/", VnpayController.order);

export default vnpayRouter;
