import { Router } from 'express';
import ProductDetailsController from '../controller/ProductDetailsController';


const ProductDetailsRouter = Router();

ProductDetailsRouter.get('/', ProductDetailsController.getProductDetails);
ProductDetailsRouter.post('/', ProductDetailsController.createProductDetails);
ProductDetailsRouter.get('/:id', ProductDetailsController.getProductDetailsById);
ProductDetailsRouter.put('/:id', ProductDetailsController.updateProductDetails);
ProductDetailsRouter.delete('/:id', ProductDetailsController.deleteProductDetails);

export default ProductDetailsRouter;
