import { Request, Response, NextFunction } from "express";
import { FavoritesList } from "../models/FavoritesList";

const FavoritesListController = {
  addFavorite: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productID, customerID } = req.body;

      const newFavorite = await FavoritesList.create({
        productID,
        customerID,
      });

      res.json({ data: newFavorite, message: "Favorite added successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getFavorites: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const favorites = await FavoritesList.findAll();
      res.json({ data: favorites });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getFavoriteById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const favorite = await FavoritesList.findByPk(id);
      if (favorite) {
        res.json({ data: favorite });
      } else {
        res.status(404).json({ message: "Favorite not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateFavorite: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { productID, customerID } = req.body;

      const favorite = await FavoritesList.findByPk(id);
      if (favorite) {
        await favorite.update({ productID, customerID });
        res.json({ message: "Favorite updated successfully" });
      } else {
        res.status(404).json({ message: "Favorite not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteFavorite: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const favorite = await FavoritesList.findByPk(id);
      if (favorite) {
        await favorite.destroy();
        res.json({ message: "Favorite deleted successfully" });
      } else {
        res.status(404).json({ message: "Favorite not found" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default FavoritesListController;
