import db from "../db"

export const follow = async (followerId: number, followingId: number) => {
    if (followerId === followingId) {
        throw new Error("You can not follow yourself")
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId,
            followingId
        }
    })

    if(existingFollow) {
        await db.follow.deleteMany({
            where: {
                followerId,
                followingId
            }
        })
        return "Unfollowing Success!"
    }

    await db.follow.create ({
        data: {
            followerId,
            followingId
        }
    })

    return "Follow Success"

}

export const getFollower = async (followingId:number) => {
    return await db.follow.findMany({
        where: {
            followingId,          
        }, include: {
            follower: {
                select: {
                    id: true,
                    fullname:true,
                    username: true,
                    profile: {
                        select: {
                            avatar:true,
                            userId: true,
                        }
                    }
                }
            }
        }
    })
}


export const getFollowing = async (followerId: number) => {
    return await db.follow.findMany({
        where: {
            followerId,
        }, include: {
            following: {
                select: {
                    id: true,
                    fullname: true,
                    username: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            }
        }
    })
}

export const getFollowingId = async (followingId: number) => {
    return await db.follow.findFirst({
        where: {
            followingId,
        },include : {
            following: {
                include: {
                    profile: {
                        select: {
                            avatar: true,
                            
                        }
                    }
                }
            }
        }
    })
}

export const getMappingFollowing= async (followerId : number) => {
    try {
        const followingUser =  await db.follow.findMany({
            where: {
                followerId
            },include: {
                following: {
                    include: {
                        profile: {
                            select: {
                                avatar:true,
                                bio:true
                            }
                        }
                    }
                }
            }
        })

        return followingUser.map((follow) => follow.following)
    } catch (error) {
        throw new Error
    }
}

export const getMappingFollower = async (userId: number) => {
    try {
        const followingUser = await db.follow.findMany({
            where: {
                followingId: userId
            }, include: {
                follower: {
                    include: {
                        profile: {
                            select: {
                                avatar: true,
                                bio: true
                            }
                        }
                    }
                }
            }
        })

        return followingUser.map((follow) => follow.follower)
    } catch(error) {
        throw new Error
    }
}