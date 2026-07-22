import mongoose from 'mongoose'
import { type } from 'os'
// import { unique } from 'next/dist/build/utils'


const userSchema = new mongoose.Schema({
    
    //mongodb jaise hi user ko save krta hai, automatically a unique id generate krta hai
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

     password: {
        type: String,
        required: [true, 'Password is required...!'],
        // unique: true,
        // lowercase: true
    },

    verified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    }

}, {timestamps: true})


const Userm = mongoose.model("Userm", userSchema)
export default Userm
