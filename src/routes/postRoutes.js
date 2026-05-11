import express from 'express';
import { postController } from '../controllers/postController.js'

const router = express.Router();

router
    .route('/')
    .get(postController.getPost)
    .post(postController.createPost)


router
    .route('/:id')
    .get(postController.getPostById)
    .put(postController.updatePost)
    .delete(postController.deletePost);

export default router;