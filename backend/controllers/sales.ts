import { Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import SaleModel from "../models/sale";


export const getAll = async (req: Request, res: Response) =>{
 try {
  const token = req.cookies.jwt
  const  user = jwt.verify(token, process.env.SECRET_KEY as string)
 
  const sales = await SaleModel.find({user:user.sub})

  console.log(sales)

  res.status(200).json({ok:true,data:sales})

 } catch (error) {
    if(error instanceof JsonWebTokenError){
      console.log({name:error.name,message: error.message})
      res.status(401).json({ok:false,message:"Resquest Invalida"})
    }
 }
}