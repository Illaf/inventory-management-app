// routes/orderRoutes.js
import express from 'express';
import { placeOrder,getMyOrders } from '../controllers/orderController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/place', protect, placeOrder);
router.get('/user', protect, getMyOrders);
export default router;

