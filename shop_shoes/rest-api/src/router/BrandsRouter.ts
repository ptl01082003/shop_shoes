import express from "express";
import BrandsController from "../controller/BrandsController";
import { ROLE_TYPES } from "../models/Roles";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";

const routerBrands = express.Router();

routerBrands.use(checkAuth);
routerBrands.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));
// Routes không yêu cầu vai trò
routerBrands.post("/", BrandsController.getBrands);
routerBrands.post("/create", BrandsController.addBrand);
routerBrands.post("/:id", BrandsController.getById);

// Routes yêu cầu vai trò ADMIN hoặc MEMBERSHIP

routerBrands.post("/edit/:id", BrandsController.updateBrand);
routerBrands.post("/remove/:id", BrandsController.deleteBrand);

export default routerBrands;
