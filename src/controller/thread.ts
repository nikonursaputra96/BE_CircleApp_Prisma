import { Request, Response } from "express"
import * as threadService from "../service/thread"


export const getThreads = async (req: Request, res: Response) => {
    try {
        const threads = await threadService.getThreads()

        res.json({
            status: true,
            message: "SUCCESS",
            data: threads,
        })
 
    } catch(error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    } 
}

export const getThread = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const thread = await threadService.getThread(+id)

        res.json({
            status: true,
            message: "SUCCESS",
            data: thread,
        })

    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    }
}

export const createThread = async (req: Request, res: Response) => {
    try {

        const {body} = req
        body.userId = res.locals.user
        const thread = await threadService.createThread(
            body,
            req.files as {[fieldname: string] : Express.Multer.File[]}
        )
        res.json({
            status: true,
            message: "SUCCESS",
            data: thread,
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    }
}   

export const getReplies = async (req: Request, res: Response) => {
    try {

        const {id} = req.params
        const replies = await threadService.getReplies(+id)
        res.json({
            status: true,
            message: "SUCCESS",
            data: replies,
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    }

}

export const getThreadUserId = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params
        const thread = await threadService.getThreadUserId(+userId)

        res.json({
            status: true,
            message: "SUCCESS",
            data: thread,
        })

    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    }
}


    
