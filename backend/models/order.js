import mongoose, { Schema } from 'mongoose';

// const orderSchema = new Schema(
//   {
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     products: [
//       {
//         product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//         quantity: { type: Number, required: true },
//       },
//     ],
//     status:Number,
//     items:[String],
//     totalPrice: { type: Number, required: true },
//     status: { type: String, enum: ['Pending', 'Processing', 'Completed'], default: 'Pending' },
//     createdAt: { type: Date, default: Date.now }
//   },
//   { timestamps: true }
// );
const orderSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  status:String,
  notified: { type: Boolean, default: false },
  placedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
