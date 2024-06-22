import { Router } from 'express';
import CommentController from '../controller/CommentController';


const CommentRouter = Router();

CommentRouter.get('/', CommentController.getComment);
CommentRouter.post('/', CommentController.createComment);
CommentRouter.get('/:id', CommentController.getCommentById);
CommentRouter.put('/:id', CommentController.updateComment);
CommentRouter.delete('/:id', CommentController.deleteComment);

export default CommentRouter;
