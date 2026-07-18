import express from "express"
import { Subscribe } from "../controllers/subscribe.controller.js"

const subscribe_router = express.Router()

subscribe_router.post("/subscribe", Subscribe)

export default subscribe_router