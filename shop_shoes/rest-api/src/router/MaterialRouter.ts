import { Router } from 'express';
import MaterialController  from '../controller/MaterialController';

const MaterialRouter = Router();

MaterialRouter.get('/', MaterialController.getMaterial);
MaterialRouter.get('/:id', MaterialController.getMaterialById);
MaterialRouter.post('/', MaterialController.createMaterial);
MaterialRouter.put('/:id', MaterialController.updateMaterial);
MaterialRouter.delete('/:id', MaterialController.deleteMaterial);

export default MaterialRouter;
