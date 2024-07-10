import express from "express";
import CustomersController from "../controller/CustomersController";

const routerCustomers = express.Router();

routerCustomers.get("/", CustomersController.getCustomers);
routerCustomers.get("/:id", CustomersController.getCustomerById);
routerCustomers.post("/", CustomersController.addCustomer);
routerCustomers.put("/:id", CustomersController.updateCustomer);
routerCustomers.delete("/:id", CustomersController.deleteCustomer);

export default routerCustomers;
