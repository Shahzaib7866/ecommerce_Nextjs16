import 'dotenv/config';

import app from './app.js'
import connectDB from './config/db.js';

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}`)
})







