import { threadId } from "worker_threads"
import db from "../db"
import { IThread } from "../type/app"


export const getThreads = async () => {
    return await db.thread.findMany ({
        where: {
            threadId:null
        },
        include: {
            image: {
                select: {
                    image:true
                },
            },
            _count: {
                select: {
                    replies: true
                }
            }
        }
    })
}

export const getThread = async (id:number) => {
    return await db.thread.findFirst ({
        where: {
            id,
            threadId:null,
        },
        include: {
            image: {
                select: {
                    image: true
                }
            }
        }
    })
}

export const createThread = async (payload: IThread, files: {[fieldname: string] : Express.Multer.File[]}) => {
    const thread = await db.thread.create({
        data : {
            ...payload,
            threadId: payload.threadId ? +payload.threadId: null
        },
    })

    if(files.image) {
        await db.threadImage.createMany({
            data: files.image.map((image) => ({
                image : image.filename,
                threadId: thread.id
            }))
        })
    }

    return thread
}

export const deletedThread = async (idThread:number, userId:number) => {
    const existedThread = await db.thread.findFirst({
        where: {
            id: idThread
        }
    })

    if(!existedThread) {
        throw new Error ("Threads not found!");
    }

    if(existedThread.userId !== userId) {
        throw new Error ("You dont have permission to delete this thread!")
    }

     await db.thread.delete ({
        where: {
            id: idThread
        }
    })

     await db.threadImage.deleteMany({
        where: {
            threadId: idThread
        }
    })

    return true
}

export const getReplies = async (threadId: number) => {
    return await db.thread.findMany({
        where: {
            threadId,
        },
        include : {
            image: {
                select: {
                    image:true,
                },
            },_count : {
                select: {
                    replies: true
                }
            }
        },
    })
}