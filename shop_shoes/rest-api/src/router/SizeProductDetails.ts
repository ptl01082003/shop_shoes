import { Router } from "express";
import SizesController from "../controller/SizeProductDetail";

const routerSizeProductDetals = Router();

routerSizeProductDetals.post("/", SizesController.addSizeProductDetail);
routerSizeProductDetals.get("/", SizesController.getSizeProductDetails);
routerSizeProductDetals.get("/:id", SizesController.getSizeProductDetailById);
routerSizeProductDetals.put("/:id", SizesController.updateSizeProductDetail);
routerSizeProductDetals.delete("/:id", SizesController.deleteSizeProductDetail);

export default routerSizeProductDetals;
