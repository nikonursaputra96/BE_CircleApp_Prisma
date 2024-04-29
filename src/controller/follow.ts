
import { Request, Response } from "express"
import * as followService from "../service/follow"

export const follow = async(req:Request, res:Response) => {
    try {
        const {followingId} = req.body
        const followerId = res.locals.user
    
        const follow = await followService.follow(followerId,followingId)
    
        res.json({
            success : true,
            message : follow
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const getFollower = async (req:Request, res:Response) => {
    try {
        const {followingId} = req.params
        const follower = await followService.getFollower(+followingId)

        res.json({
            success: true,
            message: "SUCCESS",
            data: follower
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const getFollowing = async (req:Request, res:Response) => {
    try {
        const {followerId} = req.params
        const follower = await followService.getFollowing(+followerId)

        res.json({
            success: true,
            message: "SUCCESS",
            data: follower
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const getFollowingId = async (req:Request, res:Response) => {
    try {
        const {followingId} = req.params
        const follow = await followService.getFollowingId(+followingId)

        res.json({
            success: true,
            message: "SUCCESS",
            data: follow
        })
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

export const getMappingFollower = async (req: Request, res: Response) => {
    try {
        const followingId = res.locals.user
        const followUser = await followService.getMappingFollowing(followingId)


        res.json({
            success: true,
            message: "SUCCESS",
            data: followUser
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
}

export const getMappingFollowing = async (req: Request, res: Response) => {
    try {
        const followerId = res.locals.user
        const followUser = await followService.getMappingFollower(followerId)


        res.json({
            success: true,
            message: "SUCCESS",
            data: followUser
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
}