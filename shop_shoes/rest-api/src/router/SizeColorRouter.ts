import { Router } from "express";
import SizeColorController from "../controller/SizeColorController";

const routerSizeColor = Router();

routerSizeColor.post("/", SizeColorController.addSizeColor);
routerSizeColor.get("/", SizeColorController.getSizeColors);
routerSizeColor.get("/:id", SizeColorController.getSizeColorById);
routerSizeColor.put("/:id", SizeColorController.updateSizeColor);
routerSizeColor.delete("/:id", SizeColorController.deleteSizeColor);

export default routerSizeColor;
