import { IProfile } from "../type/app";
import db from "../db"

export const updateProfile = async (userId:number , payload: IProfile) => {
    console.log(payload, "payload")
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
        }, include : {
            user: {
                select: {
                    username: true,
                    fullname: true,
                    id: true,
                    follower: {
                        include: {
                            following : {
                                select : {
                                    username: true,
                                    fullname: true,
                                    profile: {
                                        select: {
                                            avatar:true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    following: {
                        include: {
                            follower: {
                                select: {
                                    username: true,
                                    fullname: true,
                                    profile: {
                                        select: {
                                            avatar: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    
                    
                    _count: {
                        select: {
                            follower:true,
                            following:true
                        }
                    }
                },
            },
        },
        
    })
}

export const getProfileThread = async (userId:number) => {
    return await db.profile.findFirst({
        where: {
            userId,
        }, include : {
            user: {
                select: {
                    threads:{
                        select: {
                            createdAt:true,
                            content: true,
                            image: true,
                            like:true,
                            replies: true,
                            _count: {
                                select: {
                                    replies: true
                                }
                            }
                        }
                    },
                    username: true,
                    fullname: true,
                    like: true,              
                    profile: {
                        select : {
                            avatar:true,
                            cover: true,
                            bio: true,

                        },
                        
                    },
                    _count : {
                        select: {
                            follower:true,
                            following: true
                        }
                    }
                }
            }
        }
    })

}