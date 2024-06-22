import { Router } from 'express';
import CartController from '../controller/CartController';


const CartRouter = Router();

CartRouter.get('/', CartController.getCart);
CartRouter.post('/', CartController.createCart);
CartRouter.get('/:id', CartController.getCartById);
CartRouter.put('/:id', CartController.updateCart);
CartRouter.delete('/:id', CartController.deleteCart);

export default CartRouter;
