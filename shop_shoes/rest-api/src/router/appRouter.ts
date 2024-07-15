import express from "express";
import { app } from "../app";
import { RESPONSE_CODE, ResponseBody, STATUS_CODE } from "../constants";
import routerAuth from "./AuthRouter";
import routerBrands from "./BrandsRouter";
import cartsRouter from "./CartsRouter";
import routerColor from "./ColorsRouter";
import routerImage from "./ImagesRouter";
import routerMaterial from "./MaterialsRouter";
import routerOrigin from "./OriginsRouter";
import paymentRouter from "./PaymentOnlineRouter";
import routerProductDetail from "./ProductDetailsRouter";
import routerProductLine from "./ProductLinesRouter";
import routerProductPromotion from "./ProductPromotionRouter";
import routerProduct from "./ProductsRouter";
import routerPromotions from "./PromotionsRouter";
import routerSize from "./SizeRouter";
import routerStyle from "./StylesRouter";
import routerSizeProductDetals from "./SizeProductDetails";

const router = express.Router();

export function appRouter() {
  router.use("/auth", routerAuth);
  router.use("/carts", cartsRouter);
  router.use("/brands", routerBrands);
  router.use("/product-lines", routerProductLine);
  router.use("/products", routerProduct);
  router.use("/color", routerColor);
  router.use("/payment-orders", paymentRouter);
  router.use("/style", routerStyle);
  router.use("/material", routerMaterial);
  router.use("/origin", routerOrigin);
  router.use("/size", routerSize);
  router.use("/product-detail", routerProductDetail);
  router.use("/image", routerImage);
  router.use("/promotion", routerPromotions);
  router.use("/product-promotion", routerProductPromotion);
  // router.use("/size-productdetail", routerSizeProductDetals);

<<<<<<< Updated upstream
=======
  router.use("/colors", routerColor);
  // router.use("/payment", vnpayRouter);
  router.use("/styles", routerStyle);
  router.use("/materials", routerMaterial);
  router.use("/origins", routerOrigin);
  router.use("/sizes", routerSize);
  router.use("/product-details", routerProductDetail);
  router.use("/images", routerImage);
  router.use("/promotions", routerPromotions);
  router.use("/product-promotions", routerProductPromotion);
  router.use("/size-productdetails", routerSizeProductDetals);

  router.use("*", (req, res) => {
    res.status(STATUS_CODE.NOT_FOUND).json(
      ResponseBody({
        code: RESPONSE_CODE.ERRORS,
        message: "Đường dẫn không tồn tại",
      })
    );
  });

>>>>>>> Stashed changes
  app.use(`/api/${process.env.API_VERSION}`, router);
}
