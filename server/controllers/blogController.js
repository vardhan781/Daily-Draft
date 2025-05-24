import blogModel from "../models/blogModel.js";
import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import streamifier from "streamifier";

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const author = req.user.id;

    if (!title || !content || !category || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const categoryRegex = /^[A-Za-z\s]+$/;
    if (!categoryRegex.test(category)) {
      return res.status(400).json({
        message: "Category should only contain alphabets and spaces.",
      });
    }

    const tagValidationRegex = /^[A-Za-z\s,]*$/;
    if (tags && typeof tags === "string" && !tagValidationRegex.test(tags)) {
      return res.status(400).json({
        message: "Tags should only contain alphabets and commas.",
      });
    }

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "blog-thumbnails",
            public_id: `thumb_${uuidv4()}`,
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();
    const thumbnailUrl = result.secure_url;

    const tagArray =
      tags && typeof tags === "string"
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [];

    const blog = await blogModel.create({
      title,
      content,
      category,
      thumbnail: thumbnailUrl,
      tags: tagArray,
      author,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create Blog Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel
      .find()
      .sort({ createdAt: -1 })
      .populate("author", "username profileImage");

    res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    console.error("Get All Blogs Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get individual blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await blogModel
      .findById(req.params.id)
      .populate("author", "username profileImage");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Get Blog Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
