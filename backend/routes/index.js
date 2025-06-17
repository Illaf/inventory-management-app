import express from "express";
import authRoutes from "./authRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import supplierRoutes from "./supplierRoutes.js"
import productRoutes from "./productRoutes.js";
import orderRoutes from "./orderRoutes.js";
import cartRoutes from "./cartRoutes.js"
const router= express.Router();

router.use("/auth",authRoutes);
router.use("/category",categoryRoutes);
router.use("/supplier",supplierRoutes);
router.use("/product",productRoutes);
router.use("/order",orderRoutes);
router.use("/cart",cartRoutes);

export default router;