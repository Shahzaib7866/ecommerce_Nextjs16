import mongoose from 'mongoose'
import { unique } from 'next/dist/build/utils'


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
}, {timestamps: true})



export const Userm = mongoose.model("Userm", userSchema)


