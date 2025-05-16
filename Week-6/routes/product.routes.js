import express from 'express';
import {
  createProductCtrl,
  getAllProductsCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} from '../controllers/product.controller.js';

import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getAllProductsCtrl);
router.post('/', protect, createProductCtrl);
router.put('/:id', protect, updateProductCtrl);
router.delete('/:id', protect, deleteProductCtrl);

export default router;
