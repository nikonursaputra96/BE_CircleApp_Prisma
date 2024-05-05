import db from "../db"
import { registerValidation } from "../lib/validation/register"
import { IRegister } from "../type/app"
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const getUsers = async (userId:number) => {
    return await db.user.findMany({
      where: {
        NOT: {
            id:userId
        }, following: {
            none: {
                followerId: userId
            }
        }
      },
        
        include: {
            profile: {
                select: {
                    avatar:true,
                }
            },follower : {
                include: {
                    follower: {
                        select: {
                            id:true,
                            fullname:true,
                            
                        }
                    }
                },
           
            }, following : {
                select : {
                    followingId: true,
                }
            }
        },take: 5
    })
}

export const getUser = async (id: number) => {
    return await db.user.findFirst({
        where: {
            id,
        }
    })
}

export const register = async (payload: IRegister) => {
    const {error, value} = registerValidation.validate(payload)
    if (error) {
        throw new Error(error.details[0].message)
    }

    const isExist = await db.user.findFirst({
        where: {
            OR: [
                {
                    username: value.username
                },
                {
                    email: value.email
                },
            ]
        }
    })

    if (isExist) {
        throw new Error("username / email already exist")
    }

    const hashPassword = await bcrypt.hash(value.password, 10)
    value.password = hashPassword

    const user =  await db.user.create ({
        data: {
            ...value
        }
    })

    const profile = await db.profile.create ({
        data: {
            userId: user.id
        }
    })

    return {user, profile}

}

export const login = async (username:string, password:string): Promise<string> => {
    const user = await db.user.findFirst({
        where: {
            OR: [
                {
                    username,
                },
                {
                    email:username
                }
            ]
        }
    })
    
    if (!user) {
        throw new Error ("User OR Password not valid")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error("User OR Password not valid")
    }

    const token = jwt.sign({id: user.id}, process.env.SECRET_KEY!, {expiresIn: "1d"})
    
    return token
}

// Search
export const searchName = async (searchName: string) => {
    return await db.user.findMany({
        where: {
            OR: [
                {fullname: {contains: searchName}},
                {username: {contains: searchName}}
            ],
        },include : {
            profile: {
                select: {
                    avatar: true,
                    bio: true,
                    cover: true
                }
            }
        }
    })
    
}

// Suggested 
export const suggestedUsers = async () => {
    return await db.user.findMany({
        take: 10,
    })
}

