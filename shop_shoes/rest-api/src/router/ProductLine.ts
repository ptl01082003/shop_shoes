import express from "express";
import ProductLinesController from "../controller/ProductLinesController";

const routerProductLine = express.Router();

routerProductLine.post("/", ProductLinesController.addProductLine);
routerProductLine.get("/", ProductLinesController.getProductLines);
routerProductLine.get("/:id", ProductLinesController.getProductLineById);
routerProductLine.put("/:id", ProductLinesController.updateProductLine);
routerProductLine.delete("/:id", ProductLinesController.deleteProductLine);

export default routerProductLine;
