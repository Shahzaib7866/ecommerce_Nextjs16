import { Productm } from "../models/productModels.js";
import cloudinary from "../config/cloudinary.js";


const createProduct = async (req, res) => {
    try {
        const { title, description, price, stock, category } = req.body;

        const productImage = req.file; //if using multer to handle file uploads

        let productImageURL;
        if (productImage) {
            // Upload image to Cloudinary
            const result = await cloudinary.v2.uploader.upload(productImage.path);
            console.log("Cloudinary upload result:", result);
            productImageURL = result.secure_url;
        }

        const newProduct = await Productm.create({
            title,
            description,
            price,
            stock,
            category,
            productImageURL
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error, message: "new products not added" });
    }
}

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

        if (title !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (price !== undefined) updateData.price = price;
        if (stock !== undefined) updateData.stock = stock;
        if (category !== undefined) updateData.category = category;


        // Agar new image upload hui hai to hi cloudinary pe upload karo
        // warna purani image untouched rahegi
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updateData.imageUrl = result.secure_url;
        }

// runValidators: true — schema validation force karta hai update ke time bhi
// (default me findByIdAndUpdate validators skip kar deta hai)
// new: true — updated document return karta hai, old wala nahi
        const updatedProduct = await Productm.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

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
        res.status(500).json({ message: "Error deleting product: Internal server error" });

    }
};


export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };