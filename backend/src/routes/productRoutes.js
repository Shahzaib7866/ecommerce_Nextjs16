

import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import multer from "multer";

import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";

const upload = multer({ dest: "uploads/" }); // Configure multer to store uploaded files in the "uploads" directory
const router = express.Router();


// Traditional... Isme agar aapko kisi aik hi path (jaise /:id) par alag-alag HTTP methods (GET, PUT, DELETE) lagane hon, toh aapko har baar router.get('/id', ...) aur router.put('/id', ...) likhna padta hai. Path bar bar repeat hota hai.
// Route Chaining...Isme aap aik hi path (/ ya /:id) ko aik baar likhte hain aur uske sath .get(), .post(), .put() chain kar dete hain. Isse code bohot clean aur concise ho jata hai.

//route chaining
router.route('/').get(getAllProducts).post( protect, admin, upload.single("image"), createProduct);

// router.post("/", protect, admin, upload.single("image"), createProduct);
// router.get("/", protect, admin, getAllProducts);

router.route('/:id').get(getProductById).put( protect, admin, upload.single("image"), updateProduct).delete(protect, admin, deleteProduct );


// router.get("/:id", getProductById);
// // router.put("/:id", updateProduct);
// router.put("/:id", protect, admin, upload.single("image"), updateProduct);
// router.delete("/:id", protect, admin, deleteProduct);





export default router;










