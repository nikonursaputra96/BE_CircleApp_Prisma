import { Request, Response } from "express";
import * as profileService from "../service/profile"

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user
        const{body} = req
        const files = req.files as {[fieldname:string] : Express.Multer.File[]}
        let cover = ''
        let avatar = ''
        // const avatar = files.avatar? files.avatar[0].filename :null
        // const cover = files.cover? files.cover[0] .filename : null


        if(files && files.cover && files.cover[0]) {
            cover = files.cover[0].filename
        }

        if(files && files.avatar && files.avatar[0]){
            avatar = files.avatar[0].filename
        }
        
        if (cover) {
            body.cover = cover
        }
        if (avatar) {
            body.avatar = avatar
        }

        
        await profileService.updateProfile(userId, body)

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

export const getProfile = async (req:Request, res: Response) => {
    try {
        const userId = res.locals.user
        const profile = await profileService.getProfile(userId)

        res.json({
            status: true,
            message: "SUCCESS",
            data:profile
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    }
}

export const getProfileById = async (req:Request, res: Response) => {
    try {
        const {id} = req.params

        const profile = await profileService.getProfile(+id)

        res.json({
            status: true,
            message: "SUCCESS",
            data: profile
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    }
}

export const getProfilePerson = async (req:Request, res: Response) => {
    try {
        const {id} = req.params

        const profile = await profileService.getProfileThread(+id)

        res.json({
            status: true,
            message: "SUCCESS",
            data: profile
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message : err.message})
    }
}