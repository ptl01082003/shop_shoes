import { Router } from 'express';
import { getProductLine, createProductLine, updateProductLine, deleteProductLine } from '../controller/ProductLineController';

const ProductLineRouter = Router();

ProductLineRouter.get('/', getProductLine);
ProductLineRouter.post('/', createProductLine);
ProductLineRouter.put('/:id', updateProductLine);
ProductLineRouter.delete('/:id', deleteProductLine);

export default ProductLineRouter;
