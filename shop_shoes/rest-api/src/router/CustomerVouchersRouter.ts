import { Router } from 'express';
import CustomerVouchersController from '../controller/CustomerVouchersController';


const CustomerVouchersRouter = Router();

CustomerVouchersRouter.get('/', CustomerVouchersController.getCustomerVouchers);
CustomerVouchersRouter.post('/', CustomerVouchersController.createCustomerVoucher);
CustomerVouchersRouter.get('/:Voucher/:KhachHang', CustomerVouchersController.getCustomerVouchersById);
CustomerVouchersRouter.put('/:Voucher/:KhachHang', CustomerVouchersController.updateCustomerVoucher);
CustomerVouchersRouter.delete('/:Voucher/:KhachHang', CustomerVouchersController.deleteCustomerVouchers);

export default CustomerVouchersRouter;
