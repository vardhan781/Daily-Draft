import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
} from "../controllers/blogController.js";
import upload from "../config/multer.js";
import { verifyToken } from "../middlewares/auth.js";

const blogRouter = express.Router();

blogRouter.post("/create", verifyToken, upload.single("thumbnail"), createBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:id", getBlogById);

export default blogRouter;
