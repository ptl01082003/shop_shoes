import { Router } from 'express';
import { getThuongHieu, createThuongHieu, updateThuongHieu, deleteThuongHieu } from '../controller/ThuongHieuController';

const router = Router();

router.get('/', getThuongHieu);
router.post('/', createThuongHieu);
router.put('/:id', updateThuongHieu);
router.delete('/:id', deleteThuongHieu);

export default router;
