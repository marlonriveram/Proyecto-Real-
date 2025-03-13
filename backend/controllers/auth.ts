import { Request,Response } from "express"

/*Nota: Ts aca no puede inferir los tipos de datos de req y res
    por lo que se deben definir
*/
export const login = async (req: Request,res: Response) =>{
     res.send('Login')
}
export const generateCode = async (req: Request,res:Response) =>{
    res.send('GenerateCodigo')
}