import express from "express";
import ProductPromotionController from "../controller/ProductPromotionController";
// import productsRouter from "./ProductsRouter";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerProductPromotion = express.Router();

routerProductPromotion.post(
  "/",
  ProductPromotionController.getProductPromotions
);
routerProductPromotion.post(
  "/:productID/:promotionID",
  ProductPromotionController.getProductPromotionById
);

routerProductPromotion.use(checkAuth);

routerProductPromotion.use(
  checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN])
);
// Routes for ProductPromotion
routerProductPromotion.post(
  "/create",
  ProductPromotionController.addProductPromotion
);
routerProductPromotion.post(
  "/",
  ProductPromotionController.getProductPromotions
);
routerProductPromotion.post(
  "/:productID/:promotionID",
  ProductPromotionController.getProductPromotionById
);
routerProductPromotion.post(
  "/edit/:productID/:promotionID",
  ProductPromotionController.updateProductPromotion
);
routerProductPromotion.post(
  "/remove/:productID/:promotionID",
  ProductPromotionController.deleteProductPromotion
);

export default routerProductPromotion;
