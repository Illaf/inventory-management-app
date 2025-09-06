import express from "express";
import { registerUser, loginUser, logoutUser,getAllUsers } from "../controllers/userController.js";
import { verifyToken } from "../utils/cookie.js";
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/users", getAllUsers);

export default router;
