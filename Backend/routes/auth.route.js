import express from "express"
import { Auth } from "../middlewares/auth.js"
import { GetCurrentUser, GoogleAuth, Login, Logout, Register, UpdateProfile } from "../controllers/auth.controller.js"

const auth_router = express.Router()

auth_router.post("/register", Register)
auth_router.post("/login", Login)
auth_router.post("/google-auth", GoogleAuth)


auth_router.get("/logout", Logout)

auth_router.get("/getcurrentuser", Auth, GetCurrentUser)

auth_router.patch("/update-profile", Auth, UpdateProfile);



export default auth_router
