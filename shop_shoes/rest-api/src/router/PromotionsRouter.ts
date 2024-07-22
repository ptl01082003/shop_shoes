import { Router } from "express";
import PromotionsController from "../controller/PromotionsController";
import productsRouter from "./ProductsRouter";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerPromotions = Router();

routerPromotions.post("/", PromotionsController.getPromotions);
routerPromotions.post("/:id", PromotionsController.getPromotionById);

routerPromotions.use(checkAuth);
routerPromotions.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerPromotions.post("/create", PromotionsController.addPromotion);
routerPromotions.post("/edit/:id", PromotionsController.updatePromotion);
routerPromotions.post("/remove/:id", PromotionsController.deletePromotion);

export default routerPromotions;
