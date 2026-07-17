

import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    productImageURL: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        default: 0,
        type: Number
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorym"
    },
    rating: {
        default: 0,
        type: Number
    },
     owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Userm"
    }

}, {timestamps: true})



export const Productm = mongoose.model("Productm", productSchema)


