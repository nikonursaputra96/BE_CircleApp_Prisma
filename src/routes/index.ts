import { Router } from "express";
import userRouter from "./userRouter";
import profileRouter from "./profileRouter";
import threadRouter from "./threadRouter";
import likeRouter from "./likeRouter";

const router = Router()

router.use("/", userRouter)
router.use("/", profileRouter)
router.use("/", threadRouter)
router.use("/", likeRouter)

export default router