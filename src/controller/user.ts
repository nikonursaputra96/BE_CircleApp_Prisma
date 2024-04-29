import { Request, Response } from "express"
import * as userService from "../service/user"

export const register = async (req:Request, res:Response) => {
    try {
        const {body} = req
        const result = await userService.register(body)

        res.json({
            status: true,
            message: "SUCCESS",
        })
    } catch (error) {

        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    }
}

export const login = async (req:Request , res: Response) => {
    try {
        const {username, password} = req.body
        const token = await userService.login(username, password)
        res.json({
            status: true,
            message: "SUCCESS",
            data:token
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    }
}

export const getUsers = async (req:Request, res: Response) => {
    try {
        const userId = res.locals.user
        const users = await userService.getUsers(userId)

        res.json({
            status: true,
            message:"SUCCESS",
            data: users
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    }
}

// Search
export const searchName = async (req:Request, res: Response) => {
    const {searchName} = req.query
    try {
        const name =  await userService.searchName(searchName as string)

        res.json({
            status:true,
            message: "FIND DATA",
            data: name
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status:false,
            message: err.message
        })
    }
}

