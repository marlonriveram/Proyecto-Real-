import { Request, Response } from "express";
import UserModel from "../models/user";

export const getAll = async (req: Request, res: Response) =>{

    res.status(200).json({ok:true,data:[]})
}