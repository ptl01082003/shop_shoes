import express from "express";
import AddressController from "../controller/AddressController";
import productsRouter from "./ProductsRouter";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerAddress = express.Router();
routerAddress.post("/", AddressController.getAddresses);

productsRouter.use(checkAuth);

productsRouter.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerAddress.post("/create", AddressController.addAddress);

routerAddress.post("/edit", AddressController.updateAddress);
routerAddress.post("/remove", AddressController.deleteAddress);

export default routerAddress;
