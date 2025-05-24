import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
  const serverUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/blogs/all`);
      setBlogs(data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const signup = async ({ username, email, password, profileImage }) => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage) formData.append("profileImage", profileImage);

      const { data } = await axios.post(
        `${serverUrl}/api/users/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Signup failed, try again later",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${serverUrl}/api/users/login`, {
        email,
        password,
      });

      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Login failed, try again later",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const value = {
    serverUrl,
    login,
    logout,
    signup,
    token,
    user,
    setUser,
    blogs,
  };
  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
export default BlogContextProvider;
