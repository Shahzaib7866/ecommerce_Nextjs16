// import mongoose from "mongoose";
// // import { type } from "os";

// const productSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     productImageURL: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       default: 0,
//     },
//     stock: {
//       default: 0,
//       type: Number,
//     },
//     category: {
//       type: String,
//       // type: mongoose.Schema.Types.ObjectId,
//       // ref: "Categorym"
//     },
//     rating: {
//       default: 0,
//       type: Number,
//     },
//     numReviews: {
//       type: Number,
//       default: 0,
//     },
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Userm",
//     },
//   },
//   { timestamps: true }
// );

// //Ye check karta hai ki model pehle se compiled hai to wahi use karlo, warna naya banao — nodemon hot-reload ya duplicate import dono cases handle ho jate hain.
// const Productm =
//   mongoose.models.Productm || mongoose.model("Productm", productSchema);

// export default Productm;


import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // Ab single image ki jagah images ki array aur ek video field
    images: {
      type: [String], // Multiple Cloudinary image URLs
      required: true,
    },
    video: {
      type: String, // Optional video URL
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      default: 0,
      type: Number,
    },
    category: {
      type: String,
    },
    rating: {
      default: 0,
      type: Number,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Userm",
    },
  },
  { timestamps: true }
);

const Productm =
  mongoose.models.Productm || mongoose.model("Productm", productSchema);

export default Productm;
