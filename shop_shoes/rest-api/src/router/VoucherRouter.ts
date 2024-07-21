// routes/styles.ts
import { Router } from "express";
import VoucherController from "../controller/VoucherController";

const routerVoucher = Router();

routerVoucher.post("/create", VoucherController.addVoucher);
routerVoucher.post("/", VoucherController.getVouchers);
routerVoucher.post("/:id", VoucherController.getVoucherById);
routerVoucher.post("/update/:id", VoucherController.updateVoucher);
routerVoucher.post("/remove/:id", VoucherController.deleteVoucher);

export default routerVoucher;
