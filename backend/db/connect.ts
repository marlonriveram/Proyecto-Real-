import mongoose from "mongoose"
import userModel from "../models/user"

async function connectDB() {
    if(!process.env.MONGODB_URL){
        throw new Error('La variable MONGODB_URL no existe');
        
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('La conexion fue exitosa')
        // const newUser = new userModel({
        //     firstname:'Marlon',
        //     lastname:'Mosquera',
        //     email:'marlon@mail.com',
        //     login_code:'123456',
        //     role:{
        //         admin:true,
        //         seller:true
        //     }
        // })

        // console.log(newUser)
        // await newUser.save()
    } catch (error) {
        console.log('Hubo un error al conectarnos a la DB: ',error)
    }
}

export default connectDB