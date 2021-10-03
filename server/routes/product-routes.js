import express from 'express';

import checkAdmin from '../middlewares/checkAdmin.js';
import checkAuth from '../middlewares/checkAuth.js';
import {
  getAllProducts,
  getTopProducts,
  getProductById,
  getAdminProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/product-controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/firebaseConfig', checkAuth, checkAdmin, (req, res, next) => {
  res.send({
    apiKey: process.env.FIREBASE_API,
    databaseURL: process.env.FIREBASE_DB_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
});
router.get('/top', getTopProducts);
router.get('/:pid', getProductById);
router.get('/users/:uid', checkAuth, checkAdmin, getAdminProducts);
router.post('/', checkAuth, checkAdmin, createProduct);
router.delete('/:pid', checkAuth, checkAdmin, deleteProduct);
router.patch('/:pid', checkAuth, checkAdmin, updateProduct);

export default router;
