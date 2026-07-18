import mongoose from "mongoose"

const DocumentSchema = new mongoose.Schema({

    title: {
        type: String,
        default: "Untitled Document"
    },
    content: {
        type: String,
        default: ""
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {timestamps:true})

const DocumentModel = mongoose.model("Document", DocumentSchema)
export default DocumentModel
