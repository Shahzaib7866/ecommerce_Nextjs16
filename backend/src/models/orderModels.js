
import mongoose from 'mongoose'
import { unique } from 'next/dist/build/utils'


const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Userm",
    },
    orderPrice: {
        type: String,
        required: true,
    },
    orderItems: {
        //product or us ki kitni quantity store krny k liye
        type: [
            {
                productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Productm"
            },
            quantity: {
                type: Number,
                required: true
            }
        }
        ]
    },
    address: {
        type: String,
        required: true
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



export const Orderm = mongoose.model("Orderm", orderSchema)


