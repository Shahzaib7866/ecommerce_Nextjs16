
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(cookieParser());

app.use(express.json({ limit: '50kb' }));

//req. se ya frontend se json, url se data or form data or file upload receive krty hain




app.get('/', (req, res)=>{
    res.send(`<h1>Jumangi welcom to the jungle<h1>`)
})

export default app





