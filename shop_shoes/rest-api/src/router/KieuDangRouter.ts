import { Router } from 'express';
import { getKieuDang, createKieuDang, updateKieuDang, deleteKieuDang } from '../controller/KieuDangController';

const KieuDangRouter = Router();

KieuDangRouter.get('/', getKieuDang);
KieuDangRouter.post('/', createKieuDang);
KieuDangRouter.put('/:id', updateKieuDang);
KieuDangRouter.delete('/:id', deleteKieuDang);

export default KieuDangRouter;
