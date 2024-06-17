import { Router } from 'express';
import { getProduct } from '../controller/ProductController';


const Productouter = Router();

Productouter.get('/', getProduct);
// ChatLieuRouter.post('/', createChatLieu);
// ChatLieuRouter.put('/:id', updateChatLieu);
// ChatLieuRouter.delete('/:id', deleteChatLieu);

export default Productouter;
