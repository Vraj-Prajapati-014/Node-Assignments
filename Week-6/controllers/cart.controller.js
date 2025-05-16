import * as CartService from "../services/cart.service.js";

export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const result = await CartService.addToCart(userId, productId, quantity);
  res.status(200).json({ message: "Product added to cart", cart: result });
};

export const getCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await CartService.getCart(userId);
  res.status(200).json(cart);
};

export const removeFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  const updatedCart = await CartService.removeFromCart(userId, productId);
  res.status(200).json({ message: "Product removed from cart", cart: updatedCart });
};
