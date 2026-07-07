import 'dotenv/config';

import app from './app.js'
import connectDB from './config/db.js';

// dotenv.config({
//     path: './env'
// });  If your .env file is in a custom location or you need to switch between .env.production and .env.development, you must use import dotenv from 'dotenv'; and call dotenv.config({ path: '...' }) manually.

// 1. Sanitize your Port input immediately to prevent RangeErrors
const PORT = Number(process.env.PORT) || 8000;//ya AWS server ka port use kr loo

//connectDB aik async function hai..jo promise return krta hai jis ko .then() or .catch() se handle krty hain
connectDB()
.then(() => {
 // 2. Register error listeners BEFORE calling listen
        app.on("error", (err) => {
            console.error("Server encountered an error after startup:", err);
            process.exit(1);
        });

        // 3. Wrap listen in a try-catch to intercept bad port/socket setup errors
        try {
            app.listen(PORT, () => {
                console.log(`Server running smoothly on port: ${PORT}`);
            });
        } catch (listenError) {
            console.error("❌ Server failed to initialize/listen:", listenError.message);
            process.exit(1);
        }
    })

.catch((err) => {
    console.log("db connection failed 2 ", err);
    process.exit(1);
});









