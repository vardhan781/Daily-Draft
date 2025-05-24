import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Profile from "./pages/Profile/Profile";
import Blog from "./pages/Blog/Blog";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
