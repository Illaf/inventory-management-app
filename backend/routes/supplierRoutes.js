
import express from "express"
import {addSupplier,getSupplier} from "../controllers/supplierController.js";
import { admin,protect } from "../middleware/authMiddleware.js";

const router= express.Router();


    router.post("/add",protect,admin,addSupplier)
    router.get("/get",protect,admin,getSupplier)

export default router