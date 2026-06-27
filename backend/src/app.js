
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');


app.get('/', (req, res)=>{
    res.send(`<h1>Jumangi welcom to the jungle<h1>`)
})

export default app





