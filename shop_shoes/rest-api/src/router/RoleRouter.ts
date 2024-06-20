import { Router } from 'express';
import RoleController from '../controller/RoleController';

const RoleRouter = Router();

RoleRouter.get('/', RoleController.getRole);
RoleRouter.put('/:id', RoleController.getRoleById);
RoleRouter.post('/', RoleController.createRole);
RoleRouter.put('/:id', RoleController.updateRole);
RoleRouter.delete('/:id', RoleController.deleteRole);

export default RoleRouter;
