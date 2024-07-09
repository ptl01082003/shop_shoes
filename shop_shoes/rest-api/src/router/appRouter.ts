import { Origins } from "./../models/Origins";
import { Brands } from "./../models/Brands";
import express from "express";
import { app } from "../app";
import { checkAuth } from "../middleware/checkAuth";
import routerAuth from "./AuthRouter";
import routerBrands from "./BrandsRouter";
import routerProductLine from "./ProductLinesRouter";
import routerColor from "./ColorsRouter";
import routerStyle from "./StylesRouter";
import routerMaterial from "./MaterialsRouter";
import routerOrigin from "./OriginsRouter";
// <<<<<<< HEAD
// import vnpayRouter from "./VnpayRouter";
import routerProduct from "./ProductsRouter";
import routerSize from "./SizeRouter";
import routerSizeColor from "./SizeColorRouter";
import routerProductDetail from "./ProductDetailsRouter";
// =======
import PaymentOnlineRouter from "./PaymentOnlineRouter";
// >>>>>>> 005a7aac0d39b7c54e22149b51747d4fbe8822a8

const router = express.Router();

export function appRouter() {
  // <<<<<<< HEAD
  //   router.use("/payment-orders", vnpayRouter);
  // =======

  //   router.use("/payment-orders", PaymentOnlineRouter)
  // >>>>>>> 005a7aac0d39b7c54e22149b51747d4fbe8822a8

  router.use("/auth", routerAuth);

  // router.use("/uploads", uploadRouter);
  router.use("/brand", routerBrands);
  router.use("/product-line", routerProductLine);
  // router.use("/product-colors", routerProductColors);
  router.use("/product", routerProduct);
  router.use("/color", routerColor);
  router.use("/style", routerStyle);
  router.use("/material", routerMaterial);
  router.use("/origin", routerOrigin);
  // router.use("/product-color", routerProductColors);
  // router.use("/product-size", routerProductSize);
  router.use("/size", routerSize);
  router.use("/size-color", routerSizeColor);
  router.use("/product-detail", routerProductDetail);
  //PRIVATE ROUTER

  app.use(`/api/${process.env.API_VERSION}`, router);
}
