import { Router } from 'express';
import PromotionProductController from '../controller/PromotionProductController';


const PromotionProductRouter = Router();

PromotionProductRouter.get('/', PromotionProductController.getPromotionProduct);
PromotionProductRouter.post('/', PromotionProductController.createPromotionProduct);
PromotionProductRouter.get('/:KhuyenMai/:SanPham', PromotionProductController.getPromotionProductById);
PromotionProductRouter.put('/:KhuyenMai/:SanPham', PromotionProductController.updatePromotionProduct);
PromotionProductRouter.delete('/:KhuyenMai/:SanPham', PromotionProductController.deletePromotionProduct);

export default PromotionProductRouter;
