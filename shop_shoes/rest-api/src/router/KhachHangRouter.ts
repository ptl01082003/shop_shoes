
import express from "express";
import { checkAuth } from "../middleware/checkAuth";


export const KhachHangRouter = express.Router();


KhachHangRouter.use(checkAuth);

// router.post("/", BannerController.addBanner);
// router.put("/:id", BannerController.editBanner);
// router.delete("/:id", BannerController.deleteBanner);

