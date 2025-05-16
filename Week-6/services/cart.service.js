import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addToCart = async (userId, productId, quantity = 1) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  return await cart.save();
};

export const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product", "name price");
  if (!cart) throw new Error("Cart not found");
  return cart;
};

export const removeFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(item => !item.product.equals(productId));
  return await cart.save();
};
    