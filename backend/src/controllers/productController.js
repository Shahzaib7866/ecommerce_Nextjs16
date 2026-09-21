import Productm from "../models/productModels.js";
import { cloudinary, uploadtoCloudinary } from "../config/cloudinary.js";

const createProduct = async (req, res) => {
  console.log("REQ.FILES (Multer Files):", req.files);

  try {
    const { title, description, price, stock, category } = req.body;

    const files = req.files; // Multer ab `req.files` use karega (array of files)

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one product image." });
    }

    let imageUrls = [];
    let videoUrl = "";

    // Loop chala kar har file ko Cloudinary par upload karenge
    for (const file of files) {
      const cloudinaryResponse = await uploadtoCloudinary(file.path);

      if (cloudinaryResponse) {
        // Agar file video hai toh videoUrl mein daal do, warna images array mein
        if (file.mimetype.startsWith("video/")) {
          videoUrl = cloudinaryResponse.secure_url;
        } else {
          imageUrls.push(cloudinaryResponse.secure_url);
        }
      }
    }

    // Validation: Check karein ke kam az kam 1 image zaroor aayi ho
    if (imageUrls.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one valid image is required." });
    }

    const newProduct = await Productm.create({
      title,
      description,
      price,
      stock,
      category,
      images: imageUrls, // Array of image URLs
      video: videoUrl, // Optional video URL
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ error: error.message, message: "New product not added" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Productm.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Productm.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, stock, category } = req.body;

    // Sirf wahi fields updateData me daalo jo actually bheji gayi hain
    // Isse partial update sahi kaam karega (missing fields undefined ban ke DB overwrite nahi karengi)
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (category !== undefined) updateData.category = category;

    // Agar new image upload hui hai to hi cloudinary pe upload karo
    // warna purani image untouched rahegi
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.productImageURL = result.secure_url;
    }

    // runValidators: true — schema validation force karta hai update ke time bhi
    // (default me findByIdAndUpdate validators skip kar deta hai)
    // new: true — updated document return karta hai, old wala nahi
    const updatedProduct = await Productm.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Productm.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "Error deleting product: Internal server error" });
  }
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
