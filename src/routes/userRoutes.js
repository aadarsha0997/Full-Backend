import express from 'express';
import { userController } from '../controllers/userController.js'
import { userValidator } from '../middleware/userValidate.js';

const router = express.Router();

router
  .route('/')
  .get(userController.getUser)
  .post(userValidator, userController.createUser)


router
  .route('/:id')
  .get(userController.getUserById)
  .put(userValidator, userController.updateUser)
  .delete(userController.deleteUser);

export default router;