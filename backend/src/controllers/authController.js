// const Userm = require('../models/userModels');

import Userm from '../models/userModels.js';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';

const genToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "7d"});
}

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await Userm.findOne({ email});

        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        //hashed password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // const newUser = new Userm({ username, email, password: hashedPassword });

        //combines new and save() into a single asynchronous operation, creating and saving the user in one step
        const newUser = await Userm.create({ username, email, password: hashedPassword });

        //user bn gaya tu otp generate krty hain
        if(newUser){
            const otp = Math.floor(100000 + Math.random() * 900000);

            const message = `Welcome to WearIt, ${username}! Your OTP for registration is: ${otp}`;

            await sendEmail(email, "Welcome to WearIt - OTP Verification", message);

            res.status(201).json({ 
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                token: genToken(newUser._id),
                otp: otp});
        }

        else {
            res.status(400).json({ message: "Invalid user data" });
        }


        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });


    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



export default registerUser;








