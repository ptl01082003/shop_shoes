import express from "express";
import { multerStorage } from "../storage/multerStorage";
import uploadController from "../controller/uploadController";

export const uploadRouter = express.Router();

//Single file
uploadRouter.post("/single", multerStorage.single("image"), uploadController.single);

//Multiple file
uploadRouter.post("/multiple", multerStorage.any(), uploadController.multiple);

//Delete file
uploadRouter.post("/delete", uploadController.delete);
