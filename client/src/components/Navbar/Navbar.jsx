import React, { useState, useContext } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import Preview from "../Preview/Preview";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useContext(BlogContext);
  const [preview, setPreview] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleProtectedNav = (path) => {
    if (!token) {
      toast.error("Login to access the feature!");
    } else {
      navigate(path);
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <div className="nav-container">
        <p className="nav-title" onClick={() => navigate("/")}>
          DailyDraft
        </p>

        <ul className="nav-links">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => handleProtectedNav("/create")}>Create</li>
          <li onClick={() => handleProtectedNav("/profile")}>Profile</li>
          {!token ? (
            <li onClick={() => navigate("/login")}>Login</li>
          ) : (
            <li onClick={() => setPreview(true)}>Logout</li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <img
          src={assets.menu}
          className="menu-icon"
          onClick={() => setSidebarOpen(true)}
        />
      </div>

      {/* Sidebar for small screen */}
      <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>
        <img
          src={assets.back}
          className="back-icon"
          onClick={() => setSidebarOpen(false)}
        />
        <ul className="sidebar-links">
          <li
            onClick={() => {
              navigate("/");
              setSidebarOpen(false);
            }}
          >
            Home
          </li>
          <li onClick={() => handleProtectedNav("/create")}>Create</li>
          <li onClick={() => handleProtectedNav("/profile")}>Profile</li>
          {!token ? (
            <li
              onClick={() => {
                navigate("/login");
                setSidebarOpen(false);
              }}
            >
              Login
            </li>
          ) : (
            <li
              onClick={() => {
                setPreview(true);
                setSidebarOpen(false);
              }}
            >
              Logout
            </li>
          )}
        </ul>
      </div>

      {preview && <Preview setPreview={setPreview} />}
    </>
  );
};

export default Navbar;
