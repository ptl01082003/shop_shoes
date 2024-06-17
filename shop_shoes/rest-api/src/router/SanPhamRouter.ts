import { Router } from 'express';
import { getSanPham} from '../controller/SanPhamController';

const SanPhamRouter = Router();

SanPhamRouter.get('/', getSanPham);
// ChatLieuRouter.post('/', createChatLieu);
// ChatLieuRouter.put('/:id', updateChatLieu);
// ChatLieuRouter.delete('/:id', deleteChatLieu);

export default SanPhamRouter;
