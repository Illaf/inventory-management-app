import { getCart,addToCart,removeFromCart } from "../controllers/cartController.js";
import express from "express";
const router= express.Router();

router.get("/get",getCart);
router.post("/:id",addToCart);
router.delete("/:id",removeFromCart);

export default router
