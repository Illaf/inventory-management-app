
import express from "express"
import {addCategory,getCategory,getCategoryById,updateCategory,deleteCategory} from "../controllers/categoryController.js";
import { admin,protect } from "../middleware/authMiddleware.js";

const router= express.Router();


    router.post("/add",protect,admin,addCategory)
    router.get("/get",getCategory)
    router.get("/:id",getCategoryById)
    router.put("/:id",updateCategory)
    router.delete("/:id",protect,admin,deleteCategory)

export default router