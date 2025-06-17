import mongoose,{Schema} from "mongoose";

const cartSchema= new Schema ({
    userId: { type: Schema.Types.ObjectId, ref:'User' },
    productId: { type: Schema.Types.ObjectId, ref:'Product' },
    quantity:Number
})


const Cart= mongoose.model("Cart",cartSchema);
export default Cart;