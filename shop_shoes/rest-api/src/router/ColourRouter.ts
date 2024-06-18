import { Router } from 'express';
import ColourController from '../controller/ColourController';


const ColourRouter = Router();

ColourRouter.get('/', ColourController.getColour);
ColourRouter.post('/', ColourController.createColour);
ColourRouter.get('/:id', ColourController.getColourById);
ColourRouter.put('/:id', ColourController.updateColour);
ColourRouter.delete('/:id', ColourController.deleteColour);

export default ColourRouter;
