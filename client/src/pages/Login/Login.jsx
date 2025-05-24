import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { BlogContext } from "../../context/BlogContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, signup } = useContext(BlogContext);
  const [state, setState] = useState("Login");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === "Login") {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success("Login successful");
        navigate("/");
      } else toast.error(result.message);
    } else {
      const result = await signup({ ...formData, profileImage: imageFile });
      if (result.success) {
        toast.success("Signup successful");
        navigate("/");
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="login-container">
      <p className="login-title">{state}</p>
      <form onSubmit={handleSubmit}>
        {state === "Signup" && (
          <input
            type="text"
            placeholder="Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {state === "Signup" && (
          <>
            {imageFile ? (
              <div className="selected-login-pic">
                <img
                  src={URL.createObjectURL(imageFile)}
                  className="selected-login-img"
                />
              </div>
            ) : (
              <label>
                <img
                  className="login-profile-upload"
                  src={assets.upload_user}
                />
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            )}
          </>
        )}
        {state === "Signup" && imageFile && (
          <button
            className="remove-login-pic"
            type="button"
            onClick={() => setImageFile(null)}
          >
            Remove Image
          </button>
        )}

        <button className="login-submit" type="submit">
          {state}
        </button>
      </form>
      <div className="login-state-ask">
        <p>
          {state === "Login"
            ? "Don't have an account ?"
            : "Already have an account ?"}
        </p>
        {state === "Login" ? (
          <span onClick={() => setState("Signup")}>Signup Here</span>
        ) : (
          <span onClick={() => setState("Login")}>Login Here</span>
        )}
      </div>
    </div>
  );
};

export default Login;
