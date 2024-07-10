import express from "express";
import VoucherCustomerController from "../controller/VoucherCustomerController";

const routerVoucherCustomers = express.Router();

routerVoucherCustomers.post("/", VoucherCustomerController.addVoucherCustomer);
routerVoucherCustomers.get("/", VoucherCustomerController.getVoucherCustomers);
routerVoucherCustomers.get(
  "/:id",
  VoucherCustomerController.getVoucherCustomerById
);
routerVoucherCustomers.put(
  "/:id",
  VoucherCustomerController.updateVoucherCustomer
);
routerVoucherCustomers.delete(
  "/:id",
  VoucherCustomerController.deleteVoucherCustomer
);

export default routerVoucherCustomers;
