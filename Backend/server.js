import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"
import connectDB from "./database/connectDB.js"
import "./firebase/firebaseAdmin.js"
import AuthRouter from "./routes/auth.route.js"
import SubscribeRoute from "./routes/subscribe.route.js"
import ContactRoute from "./routes/contact.route.js"
import DocumentRoute from "./routes/document.route.js"

const app = express()

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({
  limit: "50mb",
}));

app.use(express.urlencoded({
  extended: true,
  limit: "50mb",
}));

app.use(cookieParser());
app.use(cookieParser())


// routes
app.use("/", SubscribeRoute)
app.use("/", ContactRoute)
app.use("/auth", AuthRouter)
app.use("/document", DocumentRoute)


// Database
connectDB()


app.get("/", (req, res) => {
  res.send("DevDocs")
})


const PORT = process.env.PORT || 2005
app.listen(PORT, () => {
  console.log(`Server : http://localhost:${PORT}`);
})