import { Router } from "express";
import ProductDetailsController from "../controller/ProductDetailsController";

const routerProductDetail = Router();

routerProductDetail.post("/", ProductDetailsController.createProductDetail);
routerProductDetail.get("/", ProductDetailsController.getAllProductDetails);
routerProductDetail.get("/:id", ProductDetailsController.getProductDetailById);
routerProductDetail.put("/:id", ProductDetailsController.updateProductDetail);
routerProductDetail.delete(
  "/:id",
  ProductDetailsController.deleteProductDetail
);

routerProductDetail.post("/add-quantity", ProductDetailsController.addQuantity);
routerProductDetail.put(
  "/update-quantity",
  ProductDetailsController.updateQuantity
);
routerProductDetail.delete(
  "/delete-quantity/:productDetailId/:sizeId",
  ProductDetailsController.deleteQuantity
);

export default routerProductDetail;
