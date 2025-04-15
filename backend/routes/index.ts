import express from "express"
import authRouter from "./auth"
import salesRouter from "./sales"


const router = express.Router()


router.use("/auth",authRouter)
router.use("/sales",salesRouter)

export default router