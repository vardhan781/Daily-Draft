import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import DisplayBlog from "../../components/DisplayBlog/DisplayBlog";
import axios from "axios";
import "./Blog.css";
import { assets } from "../../assets/assets";

const Blog = () => {
  const { id } = useParams();
  const { blogs, serverUrl } = useContext(BlogContext);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };
    fetchBlog();
  }, [id, serverUrl]);

  const randomBlogs = blogs
    .filter((b) => b._id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  if (!blog) {
    return <p className="main-blog-loading">Loading blog...</p>;
  }

  return (
    <div className="main-blog-container">
      <p className="profile-title">Explore Blog</p>
      <div className="main-blog-content">
        <div className="main-blog-upper">
          <div className="main-blog-upper-img-container">
            <img src={blog.author?.profileImage || assets.user} />
          </div>
          <p className="main-blog-upper-name">{blog.author?.username}</p>
        </div>
        <p className="main-blog-title">{blog.title}</p>
        <p className="main-blog-category">{blog.category}</p>
        <div className="main-blog-img-container">
          <img src={blog.thumbnail} alt="Blog" />
        </div>
        <p className="main-blog-description">{blog.content}</p>
        <p className="main-blogs-tags">
          Tags - [ {blog.tags?.length ? blog.tags.join(", ") : "None"} ]
        </p>
      </div>
      <p className="profile-title">Explore More</p>
      <div className="more-like-blogs-container">
        {randomBlogs.map((b) => (
          <DisplayBlog key={b._id} blog={b} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
