import { Router } from "express";
import ProductDetailsController from "../controller/ProductDetailsController";

const routerProductDetail = Router();

routerProductDetail.post("/", ProductDetailsController.addProductDetail);
routerProductDetail.get("/", ProductDetailsController.getProductDetails);
routerProductDetail.get("/:id", ProductDetailsController.getProductDetailById);
routerProductDetail.put("/:id", ProductDetailsController.updateProductDetail);
routerProductDetail.delete(
  "/:id",
  ProductDetailsController.deleteProductDetail
);

export default routerProductDetail;
