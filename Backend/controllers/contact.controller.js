import ContactModel from "../models/contact.model.js"

export const Contact = async (req ,res)=>{
    try {
        const {name, email, message} = req.body
        if(!name || !email || !message){
            return res.status(400).json({message:"All fields are required"})
        }

        await ContactModel.create({name, email, message})

        return res.status(201).json({message:"We Contact You"})
    } catch (error) {
        return res.status(500).json({message:"Failed to Contact"})
    }
}