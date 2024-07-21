// routes/origins.ts
import { Router } from "express";
import OriginsController from "../controller/OriginsController";
import { checkAuth } from "../middleware/checkAuth";
import { checkRoles } from "../middleware/checkRoles";
import { ROLE_TYPES } from "../models/Roles";

const routerOrigin = Router();

routerOrigin.use(checkAuth);

routerOrigin.use(checkRoles([ROLE_TYPES.MEMBERSHIP, ROLE_TYPES.ADMIN]));

routerOrigin.post("/create", OriginsController.addOrigin);
routerOrigin.post("/", OriginsController.getOrigins);
routerOrigin.post("/:id", OriginsController.getById);
routerOrigin.post("/edit/:id", OriginsController.updateOrigin);
routerOrigin.post("/remove/:id", OriginsController.deleteOrigin);

export default routerOrigin;
