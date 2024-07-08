import express from "express";
import ColorsController from "../controller/ColorsController";

const routerColor = express.Router();

routerColor.get("/", ColorsController.getColors);
routerColor.get("/:id", ColorsController.getColorById);
routerColor.post("/", ColorsController.addColor);
routerColor.put("/:id", ColorsController.updateColor);
routerColor.delete("/:id", ColorsController.deleteColor);

export default routerColor;
