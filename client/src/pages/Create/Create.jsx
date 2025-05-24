import React from "react";
import "./Create.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useContext } from "react";
import { BlogContext } from "../../context/BlogContext";
import { useState } from "react";
import toast from "react-hot-toast";

const Create = () => {
  const { serverUrl, token } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !category || !thumbnail) {
      toast.error("All fields except tags are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("thumbnail", thumbnail);

    try {
      await axios.post(`${serverUrl}/api/blogs/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Blog created successfully");
      setTitle("");
      setContent("");
      setCategory("");
      setTags("");
      setThumbnail(null);
      setPreviewUrl("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <div className="create-container">
      <p className="profile-title">Create a Blog</p>
      <div className="create-blog-container">
        <input
          type="text"
          className="create-blog-title"
          placeholder="Enter your blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows={14}
          className="create-blog-content"
          placeholder="Enter your blog content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          className="create-blog-title"
          placeholder="Enter your category (Use only alphabets)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <div className="create-blog-img-container">
          <label>
            <img
              src={previewUrl || assets.image_upload}
              alt="Upload"
              className={`upload-blog-img ${
                previewUrl ? "blog-selected-img" : "blog-static-img"
              }`}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </label>
        </div>
        <textarea
          rows={4}
          placeholder="Enter the tags (Seprate by commas)"
          className="create-blog-content"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button className="create-blog-btn" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Create;
