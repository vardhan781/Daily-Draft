import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";
import userRouter from "./routes/userRoute.js";
import blogRouter from "./routes/blogRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the blog server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
