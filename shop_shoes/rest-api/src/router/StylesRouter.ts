// routes/styles.ts
import { Router } from "express";
import StylesController from "../controller/StylesController";

const routerStyle = Router();

routerStyle.post("/", StylesController.addStyle);
routerStyle.get("/", StylesController.getStyles);
routerStyle.get("/:id", StylesController.getById);
routerStyle.put("/:id", StylesController.updateStyle);
routerStyle.delete("/:id", StylesController.deleteStyle);

export default routerStyle;
