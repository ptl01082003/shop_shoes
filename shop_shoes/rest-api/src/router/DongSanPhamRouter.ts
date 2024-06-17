import { Router } from 'express';
import { getDongSP, createDongSP, updateDongSP, deleteDongSP } from '../controller/DongSanPhamController';

const DongSPRouter = Router();

DongSPRouter.get('/', getDongSP);
DongSPRouter.post('/', createDongSP);
DongSPRouter.put('/:id', updateDongSP);
DongSPRouter.delete('/:id', deleteDongSP);

export default DongSPRouter;
