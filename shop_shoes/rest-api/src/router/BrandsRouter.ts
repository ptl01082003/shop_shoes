import express from "express";
import BrandsController from "../controller/BrandsController";

const routerBrands = express.Router();

routerBrands.post("/", BrandsController.addBrand);
routerBrands.get("/", BrandsController.getBrands);
routerBrands.get("/:id", BrandsController.getById);
routerBrands.put("/:id", BrandsController.updateBrand);
routerBrands.delete("/:id", BrandsController.deleteBrand);

export default routerBrands;
