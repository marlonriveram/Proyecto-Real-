import { Request, Response } from "express";
import clientModel from "../models/client";

export const getAll = async (req: Request, res: Response) => {
    try {
        const clients = await clientModel.find() // si no se le pone nada trae todo

        res.status(200).json({ ok: true, data: clients })
    } catch (error) {
        res.status(200).json({ ok: false, message: "Error del sistema" })
    }
}
export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const clients = await clientModel.findById(id) // si no se le pone nada trae todo

        res.status(200).json({ ok: true, data: clients })
    } catch (error) {
        res.status(200).json({ ok: false, message: "Error del sistema" })
    }
}


export const create = async (req: Request, res: Response) => {
    try {
        const dataClient= req.body
    
        const createClient = await clientModel.create(dataClient) // si no se le pone nada trae todo

        res.status(200).json({ ok: true, data: createClient })
    } catch (error) {
        res.status(200).json({ ok: false, message: "Error del sistema" })
    }
}
export const update = async (req: Request, res: Response) => {
    try {
        const {id}= req.params
    
        const updateClient = await clientModel.findByIdAndUpdate(id,req.body)

        res.status(201).json({ ok: true, data: updateClient })
    } catch (error) {
        res.status(200).json({ ok: false, message: "Error del sistema" })
    }
}
