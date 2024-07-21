import { Router } from "express";
import SizesController from "../controller/SizeProductDetail";

const routerSizeProductDetals = Router();

routerSizeProductDetals.post("/create", SizesController.addSizeProductDetail);
routerSizeProductDetals.post("/", SizesController.getSizeProductDetails);
routerSizeProductDetals.post("/:id", SizesController.getSizeProductDetailById);
routerSizeProductDetals.post(
  "/update/:id",
  SizesController.updateSizeProductDetail
);
routerSizeProductDetals.post(
  "/remove/:id",
  SizesController.deleteSizeProductDetail
);

export default routerSizeProductDetals;
