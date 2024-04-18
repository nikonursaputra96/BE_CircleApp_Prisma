import { Router } from "express";
import { getUsers, login, register } from "../controller/user";
import authentication from "../middleware/authentication";

const userRouter = Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/users", authentication, getUsers)

export default userRouter