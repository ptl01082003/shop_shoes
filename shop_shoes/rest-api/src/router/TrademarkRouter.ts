import { Router } from 'express';
import { getTrademark, createTrademark, updateTrademark, deleteTrademark } from '../controller/TrademarkController';

const TrademarkRouter = Router();

TrademarkRouter.get('/', getTrademark);
TrademarkRouter.post('/', createTrademark);
TrademarkRouter.put('/:id', updateTrademark);
TrademarkRouter.delete('/:id', deleteTrademark);

export default TrademarkRouter;
