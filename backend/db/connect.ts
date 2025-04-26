import mongoose from "mongoose"
import userModel from "../models/user"
import SaleModel from "../models/sale";

async function connectDB() {
    if (!process.env.MONGODB_URL) {
        throw new Error('La variable MONGODB_URL no existe');

    }
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('La conexion fue exitosa')

        // await SaleModel.create({
        //     operation_date: new Date(),
        //     user: "67d4a0b6f95e16fb368f9dda",
        //     total_amount: 50000
        // })

    } catch (error) {
        console.log('Hubo un error al conectarnos a la DB: ', error)
    }
}

export default connectDB