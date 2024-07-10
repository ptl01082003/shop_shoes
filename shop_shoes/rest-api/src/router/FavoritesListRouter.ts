import express from "express";
import FavoritesListController from "../controller/FavoritesListController";

const routerFavoritesList = express.Router();

routerFavoritesList.get("/", FavoritesListController.getFavorites);
routerFavoritesList.get("/:id", FavoritesListController.getFavoriteById);
routerFavoritesList.post("/", FavoritesListController.addFavorite);
routerFavoritesList.put("/:id", FavoritesListController.updateFavorite);
routerFavoritesList.delete("/:id", FavoritesListController.deleteFavorite);

export default routerFavoritesList;
