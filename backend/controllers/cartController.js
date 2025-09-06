import Cart from "../models/cart.js";

// POST /api/cart/add/:productId
 const addToCart = async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId;
    const quantity = req.body.quantity || 1;
  
    let cart = await Cart.findOne({ user: userId });
  
    // If no cart, create one
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }
  
    await cart.save();
    return res.status(200).json({ message: 'Cart updated successfully', cart });
  };
  

// DELETE /api/cart/remove/:productId
 const removeFromCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
  
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
  
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );
  
    await cart.save();
    res.status(200).json({ message: 'Item removed from cart' });
  };
  

// GET /api/cart
 const getCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
  
    res.status(200).json(cart);
  };
  
  // DELETE /api/cart/clear
 const clearCart = async (req, res) => {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(200).json({ message: 'Cart cleared' });
  };
  
export {getCart,addToCart,removeFromCart,clearCart}