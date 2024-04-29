import { Router } from "express";
import authentication from "../middleware/authentication";
import { follow, getFollower, getFollowing, getFollowingId, getMappingFollower, getMappingFollowing } from "../controller/follow";



const followRouter = Router()

followRouter.post("/follow", authentication, follow)
followRouter.get("/followers/:followingId",authentication, getFollower)
followRouter.get("/following/:followerId",authentication, getFollowing)
followRouter.get("/follower/:followingId",authentication, getFollowingId)


followRouter.get("/follower",authentication, getMappingFollower)
followRouter.get("/followings",authentication, getMappingFollowing)



export default followRouter