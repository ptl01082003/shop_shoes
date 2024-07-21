import express from "express";
import ImagesController from "../controller/ImagesController";

const routerImage = express.Router();

routerImage.post("/", ImagesController.getImages);
routerImage.post("/create", ImagesController.addImage);
routerImage.post("/:id", ImagesController.getImageById);

routerImage.post("/edit/:id", ImagesController.updateImage);
routerImage.post("/remove/:id", ImagesController.deleteImage);

export default routerImage;
