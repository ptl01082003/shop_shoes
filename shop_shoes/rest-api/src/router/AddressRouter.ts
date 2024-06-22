import { Router } from 'express';
import AddressController from '../controller/AddressController';


const AddressRouter = Router();

AddressRouter.get('/', AddressController.getAddress);
AddressRouter.post('/', AddressController.createAddress);
AddressRouter.get('/:id', AddressController.getAddressById);
AddressRouter.put('/:id', AddressController.updateAddress);
AddressRouter.delete('/:id', AddressController.deleteAddress);

export default AddressRouter;
