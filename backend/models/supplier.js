import mongoose,{Schema} from "mongoose";

const supplierSchema= new Schema ({
    name: { type: String, required: true },
    email:{ type: String, required: true },
    phone:{ type: String, required: true,maxLength: 10 },
    address:{ type: String},
    createdAt:{type:Date,default:Date.now()}
})


const Supplier= mongoose.model("Supplier",supplierSchema);
export default Supplier;