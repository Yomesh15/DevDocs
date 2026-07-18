import express from "express";
import { Auth } from "../middlewares/auth.js"
import {
    CreateDocument,
    GetMyDocuments,
    GetDocument,
    UpdateDocument,
    DeleteDocument,
} from "../controllers/document.controller.js";


const document_router = express.Router();



document_router.post("/create", Auth, CreateDocument);
document_router.get("/my-documents", Auth, GetMyDocuments);
document_router.get("/:id", Auth, GetDocument);
document_router.put("/update/:id", Auth, UpdateDocument);
document_router.delete("/delete/:id", Auth, DeleteDocument);



export default document_router;
