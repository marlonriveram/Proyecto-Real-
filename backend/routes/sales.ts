import express from "express";
import {getAll,create} from '../controllers/sales'
import { validateUser } from "../middleware/auth";


const router = express.Router()

router.use(validateUser())
router.get("/",getAll)
router.post("/",create) // falta por crear controller

export default router