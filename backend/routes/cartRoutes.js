import { getCart,addToCart,removeFromCart,clearCart } from "../controllers/cartController.js";
import express from "express";
import { admin,protect } from "../middleware/authMiddleware.js";
const router= express.Router();

router.get('/', protect, getCart);
router.post('/add/:productId', protect, addToCart);
router.delete('/remove/:productId', protect, removeFromCart);
router.delete('/clear', protect, clearCart);

export default router
