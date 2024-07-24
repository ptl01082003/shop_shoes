import { Router } from "express";
import ProductDetailsController from "../controller/ProductDetailsController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerProductDetail = Router();

routerProductDetail.post("/", ProductDetailsController.getAllProductDetails);

routerProductDetail.use(checkAuth);
// routerProductDetail.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerProductDetail.post(
  "/create",
  ProductDetailsController.createProductDetail
);

routerProductDetail.post("/edit", ProductDetailsController.updateProductDetail);
routerProductDetail.post(
  "/remove",
  ProductDetailsController.deleteProductDetail
);

routerProductDetail.post("/add-quantity", ProductDetailsController.addQuantity);
routerProductDetail.post(
  "/update-quantity",
  ProductDetailsController.updateQuantity
);
routerProductDetail.post(
  "/delete-quantity/:productDetailId/:sizeId",
  ProductDetailsController.deleteQuantity
);

export default routerProductDetail;
