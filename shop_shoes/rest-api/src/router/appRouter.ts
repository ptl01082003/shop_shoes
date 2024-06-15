import { app } from "../app";
import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import { uploadRouter } from "./uploadRouter";
import { databaseService } from "../config/ConnectDB";
import { VaiTroRouter } from "./VaiTroRouter";

const router = express.Router();

export function appRouter() {
  //PUBLIC ROUTER

  router.get("/haha", (req, res) => {
    res.json({
      name: "tuyen",
    });
  });

  router.use("/vai-tro", VaiTroRouter);
  router.use(checkAuth);
  router.use("/uploads", uploadRouter);

  //PRIVATE ROUTER

  app.use(`/api/${process.env.API_VERSION}`, router);
}
