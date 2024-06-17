import { Router } from 'express';
import { getMauSac, createMauSac, updateMauSac, deleteMauSac } from '../controller/MauSacController';

const MauSacRouter = Router();

MauSacRouter.get('/', getMauSac);
MauSacRouter.post('/', createMauSac);
MauSacRouter.put('/:id', updateMauSac);
MauSacRouter.delete('/:id', deleteMauSac);

export default MauSacRouter;
