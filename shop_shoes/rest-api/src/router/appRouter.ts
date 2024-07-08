import { Origins } from "./../models/Origins";
import { Brands } from "./../models/Brands";
import express from "express";
import { app } from "../app";
import { checkAuth } from "../middleware/checkAuth";
import routerAuth from "./AuthRouter";
import routerBrands from "./BrandsRouter";
import routerProductLine from "./ProductLinesRouter";
import routerProductColors from "./ProductLine";
import routerColor from "./ColorsRouter";
import routerStyle from "./StylesRouter";
import routerMaterial from "./MaterialsRouter";
import routerOrigin from "./OriginsRouter";
import vnpayRouter from "./VnpayRouter";

const router = express.Router();

export function appRouter() {
  
  router.use("/payment-orders", vnpayRouter)

  router.use("/auth", routerAuth);

  // router.use("/uploads", uploadRouter);
  router.use("/brands", routerBrands);
  router.use("/product-line", routerProductLine);
  router.use("/product-colors", routerProductColors);
  router.use("/product", routerProductColors);
  router.use("/color", routerColor);
  router.use("/style", routerStyle);
  router.use("/material", routerMaterial);
  router.use("/origin", routerOrigin);
  router.use("/product-color", routerProductColors);
  //PRIVATE ROUTER

  app.use(`/api/${process.env.API_VERSION}`, router);
}
