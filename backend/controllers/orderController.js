import Order from '../models/order.js';
import Product from '../models/product.js';

const addOrder = async (req, res) => {
  try {
    const { userId, products } = req.body; // products = [{ product, quantity }]
    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products in order' });
    }

    let totalPrice = 0;

    // Calculate total price and update stock
    for (const item of products) {
      const prod = await Product.findById(item.product);
      if (!prod) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      if (prod.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${prod.name}` });
      }

      prod.stock -= item.quantity;
      await prod.save();

      totalPrice += prod.price * item.quantity;
    }

    const newOrder = await Order.create({
      user: userId,
      products,
      totalPrice
    });

    res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

export { addOrder };
