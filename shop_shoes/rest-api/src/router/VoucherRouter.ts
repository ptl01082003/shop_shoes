// routes/styles.ts
import { Router } from "express";
import VoucherController from "../controller/VoucherController";

const routerVoucher = Router();

routerVoucher.post("/", VoucherController.addVoucher);
routerVoucher.get("/", VoucherController.getVouchers);
routerVoucher.get("/:id", VoucherController.getVoucherById);
routerVoucher.put("/:id", VoucherController.updateVoucher);
routerVoucher.delete("/:id", VoucherController.deleteVoucher);

export default routerVoucher;
