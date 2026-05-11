import express from 'express';
import { commentController } from '../controllers/commentController.js'

const router = express.Router();

router
    .route('/')
    .get(commentController.getComment)
    .post(commentController.createComment)


router
    .route('/:id')
    .get(commentController.getCommentById)
    .put(commentController.updateComment)
    .delete(commentController.deleteComment);

export default router;