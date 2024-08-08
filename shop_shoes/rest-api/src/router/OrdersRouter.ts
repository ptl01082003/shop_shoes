// routes/origins.ts
import { Router } from "express";
import PaymentOnlineController from "../controller/PaymentOnlineController";
import { checkAuth } from "../middleware/checkAuth";

const ordersRouter = Router();


ordersRouter.use(checkAuth);

ordersRouter.post("/lst-orders", PaymentOnlineController.getLstOders);


export default ordersRouter;
