import express from "express";
import userRouter from "./routes/authenticationRouter.js";
import blogRouter from "./routes/blogsRouter.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({path: "../.env"});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/users",userRouter);
app.use("/api/v1/blogs", blogRouter);

app.listen(3000, () => {
    console.log("Started");
})