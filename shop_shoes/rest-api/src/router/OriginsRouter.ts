// routes/origins.ts
import { Router } from "express";
import OriginsController from "../controller/OriginsController";

const routerOrigin = Router();

routerOrigin.post("/", OriginsController.addOrigin);
routerOrigin.get("/", OriginsController.getOrigins);
routerOrigin.get("/:id", OriginsController.getById);
routerOrigin.put("/:id", OriginsController.updateOrigin);
routerOrigin.delete("/:id", OriginsController.deleteOrigin);


export default routerOrigin
