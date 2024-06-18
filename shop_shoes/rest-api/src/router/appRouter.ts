import { KhachHangRouter } from './KhachHangRouter';
import { app } from "../app";
import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import { uploadRouter } from "./uploadRouter";
import OriginRouter from './OriginRouter';
import MaterialRouter from './MaterialRouter';
import StyleRouter from './StyleRouter';
import ColourRouter from './ColourRouter';
import ProductLineRouter from './ProductLineRouter';
import TrademarkRouter from './TrademarkRouter';
import Productouter from "../router/ProductRouter";
import ParseMiddleware from '../middleware/Parser';
import bodyParser from 'body-parser';



const router = express.Router();

export function appRouter() {
  //PUBLIC ROUTER
  app.use(bodyParser.json());

  // Parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  router.use("/origin",OriginRouter);
  router.use("/material", MaterialRouter);
  router.use("/style", StyleRouter);
  router.use("/clour", ColourRouter);
  router.use("/productline", ProductLineRouter);
  router.use("/trademark", TrademarkRouter);
  router.use("/product", Productouter);
  router.use(checkAuth);
  router.use("/uploads", uploadRouter);
 
  //PRIVATE ROUTER

  app.use(`/api/${process.env.API_VERSION}`, router);
}
