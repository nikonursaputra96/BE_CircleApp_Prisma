import { Router } from "express";
import authentication from "../middleware/authentication";
import uploadMiddleware from "../middleware/upload";
import { getProfile, updateProfile } from "../controller/profile";
import { createThread, getReplies, getThread, getThreads } from "../controller/thread";

const threadRouter = Router()

threadRouter.post("/thread", authentication, uploadMiddleware("image"), createThread)
threadRouter.get("/thread",authentication, getThreads)
threadRouter.get("/thread/:id",authentication, getThread)
threadRouter.get("/replies/:id",authentication, getReplies)


export default threadRouter