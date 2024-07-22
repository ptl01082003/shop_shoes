import { Router } from "express";
import SizesController from "../controller/SizeProductDetail";
import productsRouter from "./ProductsRouter";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerSizeProductDetals = Router();

routerSizeProductDetals.post("/", SizesController.getSizeProductDetails);
routerSizeProductDetals.post("/:id", SizesController.getSizeProductDetailById);

routerSizeProductDetals.use(checkAuth);

routerSizeProductDetals.use(
  checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN])
);

routerSizeProductDetals.post("/create", SizesController.addSizeProductDetail);

routerSizeProductDetals.post(
  "/update/:id",
  SizesController.updateSizeProductDetail
);
routerSizeProductDetals.post(
  "/remove/:id",
  SizesController.deleteSizeProductDetail
);

export default routerSizeProductDetals;
