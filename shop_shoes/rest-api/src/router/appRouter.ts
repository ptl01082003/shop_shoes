import { app } from "../app";
import express from "express";
import { checkAuth } from "../middleware /checkAuth";
import { uploadRouter } from "./uploadRouter";
const router = express.Router();

export function appRouter() {
    //PUBLIC ROUTER 
    
    router.use(checkAuth);
    
    router.use("/uploads", uploadRouter);

    //PRIVATE ROUTER

    app.use(`/api/${process.env.API_VERSION}`, router);
    
    
}