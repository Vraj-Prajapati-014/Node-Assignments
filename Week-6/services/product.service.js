import Product from '../models/product.model.js';

export const createProduct = async (productData) => {
  return await Product.create(productData);
};

export const getAllProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const total = await Product.countDocuments();
  const products = await Product.find()
    .populate('seller', 'name email')
    .skip(skip)
    .limit(limit);

  return { products, total, page, pages: Math.ceil(total / limit) };
};

export const updateProduct = async (id, data, userId) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found');
  if (product.seller.toString() !== userId) throw new Error('Unauthorized');
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id, userId) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found');
  if (product.seller.toString() !== userId) throw new Error('Unauthorized');
  return await Product.findByIdAndDelete(id);
};
