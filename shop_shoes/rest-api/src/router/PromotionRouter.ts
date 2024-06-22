import { Router } from 'express';
import PromotionController from '../controller/PromotionController';


const PromotionRouter = Router();

PromotionRouter.get('/', PromotionController.getPromotion);
PromotionRouter.post('/', PromotionController.createPromotion);
PromotionRouter.get('/:id', PromotionController.getPromotionById);
PromotionRouter.put('/:id', PromotionController.updatePromotion);
PromotionRouter.delete('/:id', PromotionController.deletePromotion);

export default PromotionRouter;
