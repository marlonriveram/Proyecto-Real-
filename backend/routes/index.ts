import express from "express"
import authRouter from "./auth"
import salesRouter from "./sales"
import clientsRouter from "./client"


const router = express.Router()


router.use("/auth",authRouter)
router.use("/sales",salesRouter)
router.use("/clients",clientsRouter)

export default router