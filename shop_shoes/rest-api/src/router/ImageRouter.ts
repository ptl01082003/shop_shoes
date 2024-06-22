import { Router } from 'express';
import ImageController from '../controller/ImageController';


const ImageRouter = Router();

ImageRouter.get('/', ImageController.getImage);
ImageRouter.post('/', ImageController.createImage);
ImageRouter.get('/:id', ImageController.getImageById);
ImageRouter.put('/:id', ImageController.updateImage);
ImageRouter.delete('/:id', ImageController.deleteImage);

export default ImageRouter;
