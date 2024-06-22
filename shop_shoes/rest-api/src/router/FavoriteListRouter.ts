import { Router } from 'express';
import FavoriteListController from '../controller/FavoriteListController';


const FavoriteListRouter = Router();

FavoriteListRouter.get('/', FavoriteListController.getFavoriteList);
FavoriteListRouter.post('/', FavoriteListController.createFavoriteList);
FavoriteListRouter.get('/:id', FavoriteListController.getFavoriteListById);
FavoriteListRouter.put('/:id', FavoriteListController.updateFavoriteList);
FavoriteListRouter.delete('/:id', FavoriteListController.deleteFavoriteList);

export default FavoriteListRouter;
