import { Router } from 'express';
import { getXuatXu, createXuatXu, updateXuatXu, deleteXuatXu } from '../controller/XuatXuController';

const XuatXuRouter = Router();

XuatXuRouter.get('/', getXuatXu);
XuatXuRouter.post('/', createXuatXu);
XuatXuRouter.put('/:id', updateXuatXu);
XuatXuRouter.delete('/:id', deleteXuatXu);

export default XuatXuRouter;
