import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect); // All cart actions require authentication

router.post("/add", addToCart);
router.get("/", getCart);
router.delete("/remove", removeFromCart);

export default router;
