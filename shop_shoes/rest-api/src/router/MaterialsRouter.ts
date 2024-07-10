import { Router } from "express";
import MaterialsController from "../controller/MaterialsController";

const routerMaterial = Router();

routerMaterial.post("/", MaterialsController.addMaterial);
routerMaterial.get("/", MaterialsController.getMaterials);
routerMaterial.get("/:id", MaterialsController.getById);
routerMaterial.put("/:id", MaterialsController.updateMaterial);
routerMaterial.delete("/:id", MaterialsController.deleteMaterial);

export default routerMaterial;
