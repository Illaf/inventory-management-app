import express from "express";
import { registerUser, loginUser, logoutUser,getAllUsers, getUserById,selectAdmin, updateProfile } from "../controllers/userController.js";
import { verifyToken } from "../utils/cookie.js";
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/users", getAllUsers);
router.get("/users", getAllUsers);
router.post("/user", getUserById);
router.post("/selectAdmin",selectAdmin)
router.put("/profile",updateProfile)
export default router;
