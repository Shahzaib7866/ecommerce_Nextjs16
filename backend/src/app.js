import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

const app = express();


// 1. Core middleware (parsing + security-ish stuff) - sabse pehle
app.use(cors());
// //    { credentials: true,
// //     origin: process.env.FRONTEND_URL || 'http://localhost:3000' }
app.use(express.json({ limit: '50kb' })); // //req. se ya frontend se json, url se data or form data or file upload receive krty hain
app.use(express.urlencoded({ extended: true, limit: '50kb' }));
app.use(cookieParser()); //server se browser ki cookie set krun ya read krun


// 2. Static files
app.use(express.static('public'));

// 3. View engine setup
app.set('view engine', 'ejs');

// 4. Test/health route
app.get('/', (req, res) => {
    res.send(`<h1>Jumangi welcome to the jungle</h1>`);
});

// 5. Actual API routes - sabse aakhir mein
app.use('/api', allRoutes); // Ab saare routes /api/... se shuru honge

export default app;



