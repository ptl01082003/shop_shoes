import { Router } from 'express';
import ProductController from '../controller/ProductController';


const Productouter = Router();

Productouter.get('/', ProductController.getProduct);
Productouter.put('/:id', ProductController.getProductById);
Productouter.post('/', ProductController.createProduct);
Productouter.put('/:id', ProductController.updateProduct);
Productouter.delete('/:id', ProductController.deleteProduct);

export default Productouter;
