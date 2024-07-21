// routes/productsRoutes.ts
import express from "express";
import ProductsController from "../controller/ProductsController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const productsRouter = express.Router();

productsRouter.use(checkAuth);

productsRouter.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

productsRouter.post("/", ProductsController.addProduct);
productsRouter.get("/", ProductsController.getProducts);
productsRouter.get("/:id", ProductsController.getById);
productsRouter.put("/:id", ProductsController.updateProduct);
productsRouter.delete("/:id", ProductsController.deleteProduct);

export default productsRouter;
