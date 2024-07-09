import express from "express";
import ProductPromotionController from "../controller/ProductPromotionController";

const routerProductPromotion = express.Router();

// Routes for ProductPromotion
routerProductPromotion.post(
  "/",
  ProductPromotionController.addProductPromotion
);
routerProductPromotion.get(
  "/",
  ProductPromotionController.getProductPromotions
);
routerProductPromotion.get(
  "/:productID/:promotionID",
  ProductPromotionController.getProductPromotionById
);
routerProductPromotion.put(
  "/:productID/:promotionID",
  ProductPromotionController.updateProductPromotion
);
routerProductPromotion.delete(
  "/:productID/:promotionID",
  ProductPromotionController.deleteProductPromotion
);

export default routerProductPromotion;
