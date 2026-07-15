import jwt from "jsonwebtoken";
import Userm from "../models/userModels.js";


// "protect" middleware — ye check karega ke request bhejne wala login hai ya nahi
const protect = async (req, res, next) => { 

    let token;

        // check kar rahe hain ke request ke header mein "authorization" field hai
    // aur wo "Bearer" se start ho rahi hai (standard JWT format: "Bearer <token>")
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            
     // "Bearer xxxxx" ko split karke sirf "xxxxx" (actual token) nikal rahe hain
            token = req.headers.authorization.split(" ")[1];

             // token ko verify kar rahe hain JWT_SECRET (.env wali secret key) ke sath
            // agar token valid/authentic hai to decoded data (jaise user id) return hoga
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // decoded token se user ki id le kar database se us user ko dhoond rahe hain
            req.user = await Userm.findById(decoded.id).select("-password");

// sab kuch sahi hai to agle middleware/route handler ko control pass kar do
            next();

        } catch (error) {
            console.error("Error verifying token:", error);
            res.status(401).json({ message: "Unauthorized" });
        }
    } else {
        res.status(401).json({ message: "No token provided" });
    }
};

// "admin" middleware, check karega ke logged-in user "admin" hai ya nahi
const admin = (req, res, next) => {

    // pehle protect middleware ne req.user set kiya hota hai
    // us mein check kar rahe hain ke user exist karta hai aur uska isAdmin flag true hai
    if (req.user && req.user.isAdmin) {
                // agar admin hai to age badhne do
        next();
    } else {
        res.status(403).json({ message: "Forbidden" });
    }
};

export { protect, admin };  

