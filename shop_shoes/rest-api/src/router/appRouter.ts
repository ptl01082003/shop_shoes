import { KhachHangRouter } from './KhachHangRouter';
import { app } from "../app";
import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import { uploadRouter } from "./uploadRouter";
import { databaseService } from "../config/ConnectDB";
import  VaiTroRouter  from "./VaiTroRouter";
import ThuongHieuRouter from '../router/ThuongHieuRouter';

const router = express.Router();

export function appRouter() {
  //PUBLIC ROUTER

  router.get("/haha", (req, res) => {
    res.json({
      name: "tuyen",
    });
  });
  router.use("/thuong-hieu", ThuongHieuRouter);
  router.use("/vai-tro", VaiTroRouter);
  router.use("/khach-hang", KhachHangRouter);
  router.use(checkAuth);
  router.use("/uploads", uploadRouter);

  //PRIVATE ROUTER

  app.use(`/api/${process.env.API_VERSION}`, router);
}
