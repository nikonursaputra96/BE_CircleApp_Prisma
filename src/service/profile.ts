import { IProfile } from "../type/app";
import db from "../db"

export const updateProfile = async (userId:number , payload: IProfile) => {
    return await db.profile.update ({
        where: {
            userId,
        }, 
        data: {
            ...payload,
        },
    })
}

export const getProfile = async (userId:number) => {
    return await db.profile.findFirst({
        where: {
            userId
        }
    })
}