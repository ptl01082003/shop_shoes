// routes/styles.ts
import { Router } from "express";
import VoucherController from "../controller/VoucherController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerVoucher = Router();

routerVoucher.post("/", VoucherController.getVouchers);
routerVoucher.post("/:id", VoucherController.getVoucherById);

routerVoucher.use(checkAuth);

routerVoucher.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerVoucher.post("/create", VoucherController.addVoucher);
routerVoucher.post("/update/:id", VoucherController.updateVoucher);
routerVoucher.post("/remove/:id", VoucherController.deleteVoucher);

export default routerVoucher;
