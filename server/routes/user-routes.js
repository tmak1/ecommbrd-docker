import express from 'express';

import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import {
  checkLoginInputs,
  checkSignupInputs,
  checkUserUpdateInputs,
  validateInputs,
} from '../middlewares/validateInputs.js';
import {
  getAllUsers,
  login,
  signup,
  updateUser,
  deleteUser,
} from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', checkAuth, checkAdmin, getAllUsers);

router.delete('/:uid', checkAuth, checkAdmin, deleteUser);

router.post('/login', checkLoginInputs, validateInputs, login);
router.post('/signup', checkSignupInputs, validateInputs, signup);
router.patch(
  '/:uid',
  checkAuth,
  checkUserUpdateInputs,
  validateInputs,
  updateUser
);

export default router;
