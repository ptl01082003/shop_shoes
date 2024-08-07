import { Router } from "express";
import VouchersController from "../controller/VoucherController";

const routerVouchers = Router();

routerVouchers.post("/create", VouchersController.addVoucher);
routerVouchers.post("/", VouchersController.getVouchers);
routerVouchers.post("/", VouchersController.getById);
routerVouchers.post("/edit", VouchersController.updateVoucher);
routerVouchers.post("/remove", VouchersController.deleteVoucher);

export default routerVouchers;
