import { KhachHangRouter } from './KhachHangRouter';
import { app } from "../app";
import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import { uploadRouter } from "./uploadRouter";
import ThuongHieuRouter from '../router/ThuongHieuRouter';
import DongSPRouter from '../router/DongSanPhamRouter';
import MauSacRouter from './MauSacRouter';
import KieuDangRouter from './KieuDangRouter';
import ChatLieuRouter from './ChatLieuRouter';
import XuatXuRouter from './XuatXuRouter';
import SanPhamRouter from './SanPhamRouter';

const router = express.Router();

export function appRouter() {
  //PUBLIC ROUTER

  router.use("/xuat-xu", XuatXuRouter);
  router.use("/chat-lieu", ChatLieuRouter);
  router.use("/kieu-dang", KieuDangRouter);
  router.use("/mau-sac", MauSacRouter);
  router.use("/dong-sp", DongSPRouter);
  router.use("/thuong-hieu", ThuongHieuRouter);
  router.use("/san-pham", SanPhamRouter);
  router.use(checkAuth);
  router.use("/uploads", uploadRouter);

  //PRIVATE ROUTER

  app.use(`/api/${process.env.API_VERSION}`, router);
}
