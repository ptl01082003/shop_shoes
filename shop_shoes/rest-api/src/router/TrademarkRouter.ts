import { Router } from 'express';
import  TrademarkController from '../controller/TrademarkController';

const TrademarkRouter = Router();

TrademarkRouter.get('/', TrademarkController.getTrademark);
TrademarkRouter.post('/', TrademarkController.createTrademark);
TrademarkRouter.put('/:id', TrademarkController.updateTrademark);
TrademarkRouter.delete('/:id', TrademarkController.deleteTrademark);

export default TrademarkRouter;
