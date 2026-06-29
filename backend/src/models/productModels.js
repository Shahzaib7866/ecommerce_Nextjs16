

import mongoose from 'mongoose'
import { unique } from 'next/dist/build/utils'


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    productImage: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        default: 0,
        type: Number,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorym"
    },
     owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Userm"
    }

}, {timestamps: true})



export const Productm = mongoose.model("Productm", productSchema)


