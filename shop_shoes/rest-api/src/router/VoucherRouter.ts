import { Router } from 'express';
import VoucherController from '../controller/VoucherController';


const VoucherRouter = Router();

VoucherRouter.get('/', VoucherController.getVoucher);
VoucherRouter.post('/', VoucherController.createVoucher);
VoucherRouter.get('/:id', VoucherController.getVoucherById);
VoucherRouter.put('/:id', VoucherController.updateVoucher);
VoucherRouter.delete('/:id', VoucherController.deleteVoucher);

export default VoucherRouter;
