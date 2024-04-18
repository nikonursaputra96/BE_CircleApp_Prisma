import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { AuthMiddlewareData } from "../type/app"

const authentication = (req: Request, res: Response, next:NextFunction) => {
    try {
        const authorization = req.headers.authorization
        const token = authorization?.split(" ")[1]
    
        if(!token) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized"
            })
        }
    
        const decode = jwt.verify(token, process.env.SECRET_KEY!)
        if(!decode) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized"
            })
        }
        
        res.locals.user = (decode as AuthMiddlewareData).id
        
       return next ()
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    }
   
}

export default authentication