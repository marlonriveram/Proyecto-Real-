import { Request, Response } from "express";
import sendEmail from "../helpers/mailer";
import UserModel from "../models/user";

export const login = async (req: Request, res: Response) => {
    const { email} = req.params
    const { code } = req.body

    const user = await UserModel.findOne({email,login_code:code})

    if(!user){
        return res.status(400).json({ok:false,message:'Usurario o codigo incorrecto'})
    }

    res.cookie('jwt','mi cookie')
    res.status(200).json({ok:true,message:'Inicio de sesión exitoso'})
};

export const generateCode = async (req: Request, res: Response) => {
    const { email } = req.params;

    // Buscar el usuario en la base de datos
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // ----------------- Generar codido aleatoro -------------------
    let  ramdomCode  = ""

    for (let i = 0; i <= 5; i++) {
        const number = Math.floor(Math.random() * 10)
        ramdomCode += number
    }
    // --------------------------------------------------------------

    user.login_code = ramdomCode
    await user.save() // guardar cambios

    // Enviar el correo electrónico
    await sendEmail({
        to: email,
        subject: "Este es tu código: " + ramdomCode,
        html: "Código para ingresar: " + ramdomCode, // Aquí podrías generar un código dinámico
    });

    

    res.status(200).json({ message: "Código enviado exitosamente." });
};
