import express, { json} from 'express';
import "dotenv/config";
import routes from "./routes/index"
import connectDB from './db/connect';

const app = express();
connectDB()
const port = process.env.PORT ||3000
app.use(json())

app.use("/api",routes)


app.listen(port, () =>{
    console.log(`Escuchando en el puerto http://localhost:${port}`)
})


