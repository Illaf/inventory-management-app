import mongoose,{Schema} from "mongoose";

const productSchema= new Schema ({
    name: {type:String,required:true},
  categoryId: {type:mongoose.Schema.Types.ObjectId,ref:"Category"},
  description:{type:String},
  images:Array(String),
  stock: {type:Number,required:true},
  price: {type:Number,required:true},
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }
  
})
const Product= mongoose.model("Product",productSchema);
export default Product;