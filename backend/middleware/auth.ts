import { NextFunction, Request, Response } from "express"
import jwt, { JsonWebTokenError } from "jsonwebtoken"

// interface UserToken{
//     sub: string
//     firstname: string
//     lastname: string
//     role: {
//         admin: boolean
//         seller: boolean
//     }
// }

// export interface CustomResqest extends Request{
//     user: UserToken
// }


export const validateUser = () => {
    return (req: any ,res: Response, next: NextFunction) => {
        try {
            console.log("Validando token")
            const token = req.cookies.jwt
                            //     token    secrect key
            const user = jwt.verify(token, process.env.SECRET_KEY as string)
            req.user = user
            next()
        } catch (error) {

            if (
                error instanceof JsonWebTokenError ||
                error instanceof jwt.TokenExpiredError
            ) {

                return res.status(401).json({ ok: false, message: error.message })
            }

            res.status(401).json({ ok: false, message: "Error del servidor" })
        }
    }
}