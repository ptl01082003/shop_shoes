import { Router } from "express";
import PromotionsController from "../controller/PromotionController";

const routerPromotion = Router();

routerPromotion.post("/", PromotionsController.addPromotion);
routerPromotion.post("/create", PromotionsController.getPromotions);
routerPromotion.post("/:promotionId", PromotionsController.getById);
routerPromotion.post("/update", PromotionsController.updatePromotion);
routerPromotion.post(
  "/delete/:promotionId",
  PromotionsController.deletePromotion
);

export default routerPromotion;
