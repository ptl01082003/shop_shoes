import { Router } from 'express';
import StaffController from '../controller/StaffController';


const StaffRouter = Router();

StaffRouter.get('/', StaffController.getStaff);
StaffRouter.post('/', StaffController.createStaff);
StaffRouter.get('/:id', StaffController.getStaffById);
StaffRouter.put('/:id', StaffController.updateStaff);
StaffRouter.delete('/:id', StaffController.deleteStaff);

export default StaffRouter;
