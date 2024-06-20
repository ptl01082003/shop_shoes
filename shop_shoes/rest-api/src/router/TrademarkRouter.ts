import { Router } from 'express';
import  TrademarkController from '../controller/TrademarkController';

const TrademarkRouter = Router();

TrademarkRouter.get('/', TrademarkController.getTrademark);
TrademarkRouter.get('/:id', TrademarkController.getTrademarkById);
TrademarkRouter.post('/', TrademarkController.createTrademark);
TrademarkRouter.put('/:id', TrademarkController.updateTrademark);
TrademarkRouter.delete('/:id', TrademarkController.deleteTrademark);

export default TrademarkRouter;
