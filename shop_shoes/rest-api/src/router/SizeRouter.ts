import { Router } from "express";
import SizesController from "../controller/SizeController";

const routerSize = Router();

routerSize.post("/", SizesController.createSize);
routerSize.get("/", SizesController.getAllSizes);
routerSize.get("/:id", SizesController.getSizeById);
routerSize.put("/:id", SizesController.updateSize);
routerSize.delete("/:id", SizesController.deleteSize);

export default routerSize;
