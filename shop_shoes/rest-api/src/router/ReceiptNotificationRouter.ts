import { Router } from 'express';
import ReceiptNotificationController from '../controller/ReceiptNotificationController';


const ReceiptNotificationRouter = Router();

ReceiptNotificationRouter.get('/', ReceiptNotificationController.getReceiptNotification);
ReceiptNotificationRouter.post('/', ReceiptNotificationController.createReceiptNotification);
ReceiptNotificationRouter.get('/:id', ReceiptNotificationController.getReceiptNotificationById);
ReceiptNotificationRouter.put('/:id', ReceiptNotificationController.updateReceiptNotification);
ReceiptNotificationRouter.delete('/:id', ReceiptNotificationController.deleteReceiptNotification);

export default ReceiptNotificationRouter;
