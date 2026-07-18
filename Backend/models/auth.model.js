import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    bio: {
        type: String,
        default: ""
    },

    jobTitle: {
        type: String,
        default: ""
    },

    company: {
        type: String,
        default: ""
    },


}, { timestamps: true })

const UserModel = mongoose.model("User", UserSchema)
export default UserModel