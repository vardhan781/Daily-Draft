import React from "react";
import "./Home.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { BlogContext } from "../../context/BlogContext";
import DisplayBlog from "../../components/DisplayBlog/DisplayBlog";
import Fuse from "fuse.js";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const { blogs } = useContext(BlogContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const fuse = useMemo(() => {
    return new Fuse(blogs, {
      keys: ["title", "author.username", "tags", "category"],
      threshold: 0.4,
    });
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (!searchTerm.trim()) return blogs;
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, fuse]);

  useEffect(() => {
    setVisibleCount(12);
  }, [searchTerm]);

  const handleMoreClick = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const hasMore = visibleCount < filteredBlogs.length;

  return (
    <div className="home-container">
      <div className="search-container">
        <img src={assets.search} />
        <input
          type="text"
          placeholder="Search for any topic"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <p className="profile-title">Explore</p>
      <div className="home-blogs-container">
        {filteredBlogs.length > 0 &&
          filteredBlogs
            .slice(0, visibleCount)
            .map((blog) => <DisplayBlog key={blog._id} blog={blog} />)}
      </div>
      {hasMore && (
        <button className="home-more-blogs" onClick={handleMoreClick}>
          More...
        </button>
      )}
    </div>
  );
};

export default Home;
