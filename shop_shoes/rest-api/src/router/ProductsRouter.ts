// routes/productsRoutes.ts
import express from "express";
import ProductsController from "../controller/ProductsController";

const routerProduct = express.Router();

routerProduct.post("/", ProductsController.addProduct);
routerProduct.get("/", ProductsController.getProducts);
routerProduct.get("/:id", ProductsController.getById);
routerProduct.put("/:id", ProductsController.updateProduct);
routerProduct.delete("/:id", ProductsController.deleteProduct);

export default routerProduct;
