import express from "express";
import AddressController from "../controller/AddressController";

const routerAddress = express.Router();

routerAddress.post("/create", AddressController.addAddress);
routerAddress.post("/", AddressController.getAddresses);
routerAddress.post("/:id", AddressController.getAddressById);
routerAddress.post("/edit/:id", AddressController.updateAddress);
routerAddress.post("/remove/:id", AddressController.deleteAddress);

export default routerAddress;
