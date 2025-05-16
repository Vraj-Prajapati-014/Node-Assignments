import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from '../services/product.service.js';

export const createProductCtrl = async (req, res) => {
  if (req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Only sellers can add products' });
  }

  try {
    const product = await createProduct({ ...req.body, seller: req.user._id });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllProductsCtrl = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const data = await getAllProducts(page, limit);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProductCtrl = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body, req.user._id);
    res.json(product);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

export const deleteProductCtrl = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id, req.user._id);
    res.json({ message: 'Product deleted', product });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};
