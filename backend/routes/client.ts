import express from "express";
import { create, getAll, getById, update } from "../controllers/client";
import { validateUser } from "../middleware/auth";


const router = express.Router()

router.use(validateUser()) // Validador de usuario logueado

router.get("/",getAll)
router.get("/:id",getById)
router.post("/",create) 
router.put("/:id",update)

export default router