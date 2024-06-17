import { Router } from 'express';
import { getThuongHieu, createThuongHieu, updateThuongHieu, deleteThuongHieu } from '../controller/ThuongHieuController';

const ThuongHieuRouter = Router();

ThuongHieuRouter.get('/', getThuongHieu);
ThuongHieuRouter.post('/', createThuongHieu);
ThuongHieuRouter.put('/:id', updateThuongHieu);
ThuongHieuRouter.delete('/:id', deleteThuongHieu);

export default ThuongHieuRouter;
