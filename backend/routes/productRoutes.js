
import express from "express"
import {addProduct,getProduct,updateProduct,deleteProduct,getProductById, getProductListing} from "../controllers/productController.js";
import { admin,protect } from "../middleware/authMiddleware.js";

const router= express.Router();


    router.post("/add",addProduct)
    router.get("/get",getProduct)
    router.get("/:id",getProductById)
    router.put("/:id",updateProduct)
    router.delete("/:id",protect,admin,deleteProduct)
    router.get("/productlist",getProductListing)

export default router