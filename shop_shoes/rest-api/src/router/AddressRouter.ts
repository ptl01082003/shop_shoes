import express from "express";
import AddressController from "../controller/AddressController";

const routerAddress = express.Router();

routerAddress.post("/", AddressController.addAddress);
routerAddress.get("/", AddressController.getAddresses);
routerAddress.get("/:id", AddressController.getAddressById);
routerAddress.put("/:id", AddressController.updateAddress);
routerAddress.delete("/:id", AddressController.deleteAddress);

export default routerAddress;
