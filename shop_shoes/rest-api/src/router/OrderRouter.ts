import { Router } from 'express';
import OrderController from '../controller/OrderController';


const OrderRouter = Router();

OrderRouter.get('/', OrderController.getOrder);
OrderRouter.post('/', OrderController.createOrder);
OrderRouter.get('/:id', OrderController.getOrderById);
OrderRouter.put('/:id', OrderController.updateOrder);
OrderRouter.delete('/:id', OrderController.deleteOrder);

export default OrderRouter;
