import { Router } from 'express';
import StyleController from '../controller/StyleController';

const StyleRouter = Router();

StyleRouter.get('/', StyleController.getStyle);
StyleRouter.post('/', StyleController.createStyle);
StyleRouter.put('/:id', StyleController.updateStyle);
StyleRouter.delete('/:id', StyleController.deleteStyle);

export default StyleRouter;
