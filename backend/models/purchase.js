// models/purchase.model.js
import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now }
});

const Purchase= mongoose.model('Purchase', purchaseSchema);

export default Purchase;
