
import { Router } from "express";
import CustomerController from '../controller/CustomerController';


const CustomerRouter = Router();

CustomerRouter.get('/', CustomerController.getCustomer);
CustomerRouter.post('/', CustomerController.createCustomer);
CustomerRouter.get('/:id', CustomerController.getCustomerById);
CustomerRouter.put('/:id', CustomerController.updateCustomer);
CustomerRouter.delete('/:id', CustomerController.deleteCustomer);

export default CustomerRouter;