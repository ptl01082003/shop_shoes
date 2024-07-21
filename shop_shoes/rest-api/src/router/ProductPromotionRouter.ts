import express from "express";
import ProductPromotionController from "../controller/ProductPromotionController";

const routerProductPromotion = express.Router();

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
