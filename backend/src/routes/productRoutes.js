

import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import multer from "multer";

import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";

const upload = multer({ dest: "uploads/" }); // Configure multer to store uploaded files in the "uploads" directory
const router = express.Router();

router.post("/add", protect, admin, upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
// router.put("/:id", updateProduct);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;










