import mongoose,{Schema} from "mongoose";

const categorySchema= new Schema ({
    name: { type: String, required: true },
    description:{ type:String}
})


const Category= mongoose.model("Category",categorySchema);
export default Category;