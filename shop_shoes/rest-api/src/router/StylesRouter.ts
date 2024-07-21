// routes/styles.ts
import { Router } from "express";
import StylesController from "../controller/StylesController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerStyle = Router();

routerStyle.use(checkAuth);

routerStyle.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerStyle.post("/create", StylesController.addStyle);
routerStyle.post("/", StylesController.getStyles);
routerStyle.post("/:id", StylesController.getById);
routerStyle.post("/edit/:id", StylesController.updateStyle);
routerStyle.post("/remove/:id", StylesController.deleteStyle);

export default routerStyle;
