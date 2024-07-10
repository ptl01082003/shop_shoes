import express from "express";
import CartsController from "../controller/CartsController";

const routerCarts = express.Router();

routerCarts.post("/", CartsController.addCart);
routerCarts.get("/", CartsController.getCarts);
routerCarts.get("/:id", CartsController.getCartById);
routerCarts.put("/:id", CartsController.updateCart);
routerCarts.delete("/:id", CartsController.deleteCart);

export default routerCarts;
