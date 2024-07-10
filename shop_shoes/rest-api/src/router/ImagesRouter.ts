import express from "express";
import ImagesController from "../controller/ImagesController";

const routerImage = express.Router();

routerImage.get("/", ImagesController.getImages);
routerImage.get("/:id", ImagesController.getImageById);
routerImage.post("/", ImagesController.addImage);
routerImage.put("/:id", ImagesController.updateImage);
routerImage.delete("/:id", ImagesController.deleteImage);

export default routerImage;
