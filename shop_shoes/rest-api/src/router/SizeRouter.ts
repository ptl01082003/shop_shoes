import { Router } from 'express';
import SizeController from '../controller/SizeController';


const SizeRouter = Router();

SizeRouter.get('/', SizeController.getSize);
SizeRouter.post('/', SizeController.createSize);
SizeRouter.get('/:id', SizeController.getSizeById);
SizeRouter.put('/:id', SizeController.updateSize);
SizeRouter.delete('/:id', SizeController.deleteSize);

export default SizeRouter;
