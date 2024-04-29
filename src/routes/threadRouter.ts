import { Router } from "express";
import authentication from "../middleware/authentication";
import uploadMiddleware from "../middleware/upload";
import { createThread, getReplies, getThread,  getThreadUserId,  getThreads } from "../controller/thread";

const threadRouter = Router()

threadRouter.post("/thread", authentication, uploadMiddleware("image"), createThread)
threadRouter.get("/thread", getThreads)
threadRouter.get("/thread/:id", getThread)
threadRouter.get("/replies/:id",authentication, getReplies)
threadRouter.get("/thread/user/:userId",authentication, getThreadUserId)


export default threadRouter