import SubscribeModel from "../models/subscribe.model.js"


export const Subscribe = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(500).json({ message: "Email is required" })
        }

        const exists = await SubscribeModel.findOne({ email })
        if (exists) {
            return res.status(400).json({ message: "You Already Subscribed" })
        }

        await SubscribeModel.create({email})

        return res.status(201).json({ message: "Subscribe Successfully", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Failed to Subscribe" })
    }
}