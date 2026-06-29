import mongoose from 'mongoose'


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, {timestamps: true})



export const Categorym = mongoose.model("Categorym", categorySchema)