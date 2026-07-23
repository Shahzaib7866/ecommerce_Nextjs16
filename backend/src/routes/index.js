import express from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
// import orderRoutes from './orderRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
// router.use('/orders', orderRoutes);
// router.use('/payment', paymentRoutes);
// router.use('/analytics', analyticsRoutes);

export default router;







