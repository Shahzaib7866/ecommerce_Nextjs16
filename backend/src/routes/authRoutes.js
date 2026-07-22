import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/authController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers);
// router.get("/user:id", protect, admin, getUsers);


export default router;










