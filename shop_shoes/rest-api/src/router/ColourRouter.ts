import { Router } from 'express';
import { getColour, createColour, updateColour, deleteColour } from '../controller/ColourController';

const ColourRouter = Router();

ColourRouter.get('/', getColour);
ColourRouter.post('/', createColour);
ColourRouter.put('/:id', updateColour);
ColourRouter.delete('/:id', deleteColour);

export default ColourRouter;
