import User from "../models/user.js"
import Order from "../models/order.js"

export const getUserOrdersUnderAdmin = async (req, res) => {
    const adminId = req.user._id;
  
    const users = await User.find({ admin: adminId }).select('_id');
    const userIds = users.map(u => u._id);
  
    const orders = await Order.find({ user: { $in: userIds } })
      .populate('user', 'name email')
      .sort({ placedAt: -1 });
  
    res.status(200).json(orders);
  };
  export const getAdmins = async(req,res) =>{
    try {
      const admins= await User.find({role:'admin'}).select('-passowrd');
      res.status(200).json(admins)
    } catch (error) {
      res.status(500).json(error)
    }
}
  export const changeStatusOrder = async (req, res) => {
    try {
      const { status } = req.body; 
  
      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: 'Order not found' });
  
      order.status = status;
      await order.save();
  
      res.status(200).json({ success: true, message: `Order ${status}`, order });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  }
  