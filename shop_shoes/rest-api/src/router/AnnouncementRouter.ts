import { Router } from 'express';
import AnnouncementController from '../controller/AnnouncementController';


const AnnouncementRouter = Router();

AnnouncementRouter.get('/', AnnouncementController.getAnnouncement);
AnnouncementRouter.post('/', AnnouncementController.createAnnouncement);
AnnouncementRouter.get('/:id', AnnouncementController.getAnnouncementById);
AnnouncementRouter.put('/:id', AnnouncementController.updateAnnouncement);
AnnouncementRouter.delete('/:id', AnnouncementController.deleteAnnouncement);

export default AnnouncementRouter;
