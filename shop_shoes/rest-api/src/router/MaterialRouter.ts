import { Router } from 'express';
import { getMaterial, createMaterial, updateMaterial, deleteMaterial } from '../controller/MaterialController';

const MaterialRouter = Router();

MaterialRouter.get('/', getMaterial);
MaterialRouter.post('/', createMaterial);
MaterialRouter.put('/:id', updateMaterial);
MaterialRouter.delete('/:id', deleteMaterial);

export default MaterialRouter;
