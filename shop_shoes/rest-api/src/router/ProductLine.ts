import express from "express";
import ProductColorsController from "../controller/ProductColorsController";

const routerProductColors = express.Router();

routerProductColors.post("/", ProductColorsController.addProductColor);
routerProductColors.get("/", ProductColorsController.getProductColors);
routerProductColors.get("/:id", ProductColorsController.getProductColorById);
routerProductColors.put("/:id", ProductColorsController.updateProductColor);
routerProductColors.delete("/:id", ProductColorsController.deleteProductColor);

export default routerProductColors;
