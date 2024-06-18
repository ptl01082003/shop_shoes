import { Router } from 'express';
import OriginController from '../controller/OriginController';

const OriginRouter = Router();

OriginRouter.get('/', OriginController.getOrigin);
OriginRouter.post('/', OriginController.createOrigin);
OriginRouter.put('/:id', OriginController.updateOrigin);
OriginRouter.delete('/:id', OriginController.deleteOrigin);

export default OriginRouter;
