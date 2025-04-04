import express, { json} from 'express';
import "dotenv/config";
import routes from "./routes/index"
import connectDB from './db/connect';
import cors from 'cors'

const app = express();
connectDB() // FUNCION DE CONEXION A LA BASE DE DATOS
app.use(json()) //middleware para parcear los json qu van bienen en el body

app.use(cors({origin:"http://localhost:3001"})) // solo este origin va a tener acceso a la api:http://localhost:3001

const port = process.env.PORT ||3000

app.use("/api",routes) // rutas


app.listen(port, () =>{
    console.log(`Escuchando en el puerto http://localhost:${port}`)
})


