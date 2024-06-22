import { Router } from 'express';
import CustomerVouchersController from '../controller/CustomerVouchersController';


const CustomerVouchersRouter = Router();

CustomerVouchersRouter.get('/', CustomerVouchersController.getCustomerVouchers);
CustomerVouchersRouter.post('/', CustomerVouchersController.createCustomerVouchers);
CustomerVouchersRouter.get('/:id', CustomerVouchersController.getCustomerVouchersById);
CustomerVouchersRouter.put('/:id', CustomerVouchersController.updateCustomerVouchers);
CustomerVouchersRouter.delete('/:id', CustomerVouchersController.deleteCustomerVouchers);

export default CustomerVouchersRouter;
