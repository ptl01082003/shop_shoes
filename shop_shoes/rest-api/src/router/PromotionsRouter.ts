import { Router } from "express";
import PromotionsController from "../controller/PromotionsController";

const routerPromotions = Router();

routerPromotions.post("/", PromotionsController.addPromotion);
routerPromotions.get("/", PromotionsController.getPromotions);
routerPromotions.get("/:id", PromotionsController.getPromotionById);
routerPromotions.put("/:id", PromotionsController.updatePromotion);
routerPromotions.delete("/:id", PromotionsController.deletePromotion);

export default routerPromotions;
