import { Router } from "express";
import PromotionsController from "../controller/PromotionsController";

const routerPromotions = Router();

routerPromotions.post("/create", PromotionsController.addPromotion);
routerPromotions.post("/", PromotionsController.getPromotions);
routerPromotions.post("/:id", PromotionsController.getPromotionById);
routerPromotions.post("/edit/:id", PromotionsController.updatePromotion);
routerPromotions.post("/remove/:id", PromotionsController.deletePromotion);

export default routerPromotions;
