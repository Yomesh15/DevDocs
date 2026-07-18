import express from "express"
import { Contact } from "../controllers/contact.controller.js"

const contact_router = express.Router()

contact_router.post("/contact", Contact)

export default contact_router