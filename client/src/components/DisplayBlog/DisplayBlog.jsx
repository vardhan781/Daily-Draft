import React from "react";
import "./DisplayBlog.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../lib/useWindowWidth";

const DisplayBlog = ({ blog }) => {
  const navigate = useNavigate();
  const width = useWindowWidth();

  const contentPreview =
    width < 1090
      ? blog.content.slice(0, 220) + " ..."
      : blog.content.slice(0, 600) + " ....";
  return (
    <div className="display-blog-card">
      <div className="display-blog-upper">
        <p className="display-blog-title">{blog.title.slice(0, 26)} ...</p>
        <img src={assets.blog} alt="" className="display-blog-pen" />
      </div>
      <p className="display-blog-author">
        {blog.author?.username.slice(0, 26)} ...
      </p>
      <div className="display-blog-content">{contentPreview}</div>
      <p
        className="more-blog-read"
        onClick={() => navigate(`/blog/${blog._id}`)}
      >
        Read More...
      </p>
    </div>
  );
};

export default DisplayBlog;
