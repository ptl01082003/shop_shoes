import express from "express";
import FavoritesListController from "../controller/FavoritesListController";

const routerFavoritesList = express.Router();

routerFavoritesList.post("/", FavoritesListController.getFavorites);
routerFavoritesList.post("/create", FavoritesListController.addFavorite);
routerFavoritesList.post("/:id", FavoritesListController.getFavoriteById);

routerFavoritesList.post("/edit/:id", FavoritesListController.updateFavorite);
routerFavoritesList.post("/remove/:id", FavoritesListController.deleteFavorite);

export default routerFavoritesList;
