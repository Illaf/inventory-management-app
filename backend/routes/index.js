import express from "express";
import authRoutes from "./authRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import supplierRoutes from "./supplierRoutes.js"
import productRoutes from "./productRoutes.js";
import orderRoutes from "./orderRoutes.js";
import cartRoutes from "./cartRoutes.js"
import adminRoutes from "./adminRoutes.js"
const router= express.Router();
import { verifyToken } from "../utils/cookie.js";
import { getAdmins } from "../controllers/adminController.js";
router.use("/auth",authRoutes);
router.get('/admins',  getAdmins);
router.use(verifyToken)
router.use("/category",categoryRoutes);
router.use("/supplier",supplierRoutes);
router.use("/product",productRoutes);
router.use("/order",orderRoutes);
router.use("/cart",cartRoutes);
router.use("/admin",adminRoutes);

export default router;