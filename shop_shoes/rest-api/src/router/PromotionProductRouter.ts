import { Router } from 'express';
import PromotionProductController from '../controller/PromotionProductController';


const PromotionProductRouter = Router();

PromotionProductRouter.get('/', PromotionProductController.getPromotionProduct);
PromotionProductRouter.post('/', PromotionProductController.createPromotionProduct);
PromotionProductRouter.get('/:id', PromotionProductController.getPromotionProductById);
PromotionProductRouter.put('/:id', PromotionProductController.updatePromotionProduct);
PromotionProductRouter.delete('/:id', PromotionProductController.deletePromotionProduct);

export default PromotionProductRouter;
