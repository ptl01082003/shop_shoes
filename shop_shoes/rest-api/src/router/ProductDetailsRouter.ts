import { Router } from "express";
import ProductDetailsController from "../controller/ProductDetailsController";

const routerProductDetail = Router();

routerProductDetail.post("/", ProductDetailsController.addProductDetails);
routerProductDetail.get("/", ProductDetailsController.getProductDetails);
routerProductDetail.get("/:id", ProductDetailsController.getProductDetailsById);
routerProductDetail.put("/:id", ProductDetailsController.updateProductDetails);
routerProductDetail.delete(
  "/:id",
  ProductDetailsController.deleteProductDetails
);

export default routerProductDetail;
