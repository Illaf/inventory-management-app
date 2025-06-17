import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status:Number,
    items:[String],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Processing', 'Completed'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
