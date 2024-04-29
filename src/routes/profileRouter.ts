import { Router } from "express";
import authentication from "../middleware/authentication";
import uploadMiddleware from "../middleware/upload";
import { getProfile, getProfileById, getProfilePerson, updateProfile } from "../controller/profile";

const profileRouter = Router()

profileRouter.patch("/profile", authentication, uploadMiddleware("cover"), updateProfile)
profileRouter.get("/profile",authentication, getProfile)
profileRouter.get("/profile/:id",authentication, getProfile)
profileRouter.get("/profile-id/:id",authentication, getProfilePerson)


export default profileRouter