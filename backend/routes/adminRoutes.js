// routes/adminRoutes.js
import express from 'express';
import { getUserOrdersUnderAdmin, changeStatusOrder, getAdmins } from '../controllers/adminController.js';
import {protect,admin} from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/orders', protect, admin, getUserOrdersUnderAdmin);
router.put('/status/:id', protect, admin, changeStatusOrder);

export default router;
