import { Router } from 'express';
import OrderDetailsController from '../controller/OrderDetailsController';


const OrderDetailsRouter = Router();

OrderDetailsRouter.get('/', OrderDetailsController.getOrderDetails);
OrderDetailsRouter.post('/', OrderDetailsController.createOrderDetails);
OrderDetailsRouter.get('/:id', OrderDetailsController.getOrderDetailsById);
OrderDetailsRouter.put('/:id', OrderDetailsController.updateOrderDetails);
OrderDetailsRouter.delete('/:id', OrderDetailsController.deleteOrderDetails);

export default OrderDetailsRouter;
