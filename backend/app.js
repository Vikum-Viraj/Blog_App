import express from "express";
import mongoose from "mongoose";
import blogrouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors"
import  dotenv from 'dotenv' 
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json())


app.use("/api/user",router);
app.use("/api/blog",blogrouter)


mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
.then(() => app.listen(5000))
.then(() => console.log("Database is Connected"))
.catch((err) => console.log(err));

