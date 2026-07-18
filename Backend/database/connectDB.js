import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            serverSelectionTimeoutMS: 60000,
            connectTimeoutMS: 60000,
        });

        console.log("Database Connected ✔️");
    } catch (error) {
        console.log(error);

        console.log("Database Not Connected ⛔");
    }
}

export default connectDB