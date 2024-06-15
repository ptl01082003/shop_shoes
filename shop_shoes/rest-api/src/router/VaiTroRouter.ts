import express from "express";
import {VaiTroController} from "../controller/VaiTroController";
import { checkAuth } from "../middleware/checkAuth";


export const VaiTroRouter = express.Router();

VaiTroRouter.get("/vai-tro",VaiTroController.getAllVaiTro);

VaiTroRouter.use(checkAuth);

// router.post("/", BannerController.addBanner);
// router.put("/:id", BannerController.editBanner);
// router.delete("/:id", BannerController.deleteBanner);

