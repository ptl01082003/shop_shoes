import { Router } from "express";
import VouchersController from "../controller/VoucherController";

const routerVouchers = Router();

routerVouchers.post("/create", VouchersController.addVoucher);
routerVouchers.post("/", VouchersController.getVouchers);
routerVouchers.post("/:vouchersId", VouchersController.getById);
routerVouchers.post("/update", VouchersController.updateVoucher);
routerVouchers.post("/delete/:vouchersId", VouchersController.deleteVoucher);

export default routerVouchers;
