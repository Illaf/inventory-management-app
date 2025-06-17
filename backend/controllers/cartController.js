import Cart from "../models/cart.js";

const addToCart = async(req,res)=>{
    const userId= req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
let product= await  Cart.findOne({userId:userId,productId});
if(product){
await Cart.findByIdAndUpdate(product.id,{
    quantity:quantity+ product.quantity
})
}else{
    product= new Cart({
        userId:userId,
        productId:productId,
        quantity:quantity
    });
    await product.save();
}
return res.status(200).json({message:"added to cart"})
}

const removeFromCart = async (userId,productId) =>{
await Cart.findOneAndDelete({userId,productId})
return res.status(200).json({message:"cart deleted successfully"})
}

const getCart= async(req,res)=>{
    const userId= req.user.id;
const products= await Cart.find({userId:userId}).populate("productId")
const items=products.map((x)=> {
    return {quantity:x.quantity,product:x.productId}
})
return res.send(items)
}

export {getCart,addToCart,removeFromCart}