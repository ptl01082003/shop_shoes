import { Router } from 'express';
import { getStyle, createStyle, updateStyle, deleteStyle } from '../controller/StyleController';

const StyleRouter = Router();

StyleRouter.get('/', getStyle);
StyleRouter.post('/', createStyle);
StyleRouter.put('/:id', updateStyle);
StyleRouter.delete('/:id', deleteStyle);

export default StyleRouter;
