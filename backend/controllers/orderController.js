import Order from '../models/order.js';
import Cart from '../models/cart.js';

export const placeOrder = async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price
  }));

  const total = orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const order = new Order({
    user: userId,
    items: orderItems,
    total
  });

  await order.save();
  await Cart.findOneAndDelete({ user: userId }); // clear cart

  res.status(201).json({ message: 'Order placed successfully', order });
};
// API: GET /api/orders/user
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ placedAt: -1 });
  res.json(orders);
};

// Optional: notify and mark as read
export const markOrderNotified = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.orderId, user: req.user._id });

  if (order && order.approved && !order.notified) {
    order.notified = true;
    await order.save();
    res.json({ message: 'Order marked as notified' });
  } else {
    res.status(400).json({ message: 'No new notification' });
  }
};

