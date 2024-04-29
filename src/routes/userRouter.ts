import { Router } from "express";
import { getUsers, login, register, searchName } from "../controller/user";
import authentication from "../middleware/authentication";

const userRouter = Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/users", authentication, getUsers)
userRouter.get("/users/search", authentication, searchName)


export default userRouter