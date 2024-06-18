import ProductLineController from '../controller/ProductLineController';
import { Router } from 'express';

const ProductLineRouter = Router();

ProductLineRouter.get('/', ProductLineController.getProductLine);
ProductLineRouter.post('/', ProductLineController.createProductLine);
ProductLineRouter.put('/:id', ProductLineController.updateProductLine);
ProductLineRouter.delete('/:id', ProductLineController.deleteProductLine);

export default ProductLineRouter;
