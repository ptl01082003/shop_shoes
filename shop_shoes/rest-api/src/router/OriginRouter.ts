import { Router } from 'express';
import { getOrigin, createOrigin, updateOrigin, deleteOrigin } from '../controller/OriginController';

const OriginRouter = Router();

OriginRouter.get('/', getOrigin);
OriginRouter.post('/', createOrigin);
OriginRouter.put('/:id', updateOrigin);
OriginRouter.delete('/:id', deleteOrigin);

export default OriginRouter;
