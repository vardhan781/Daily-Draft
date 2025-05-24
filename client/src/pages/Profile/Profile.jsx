import React, { useContext, useState } from "react";
import "./Profile.css";
import { assets } from "../../assets/assets";
import { BlogContext } from "../../context/BlogContext";
import toast from "react-hot-toast";
import axios from "axios";
import DisplayBlog from "../../components/DisplayBlog/DisplayBlog";

const Profile = () => {
  const { user, blogs, token, serverUrl, setUser } = useContext(BlogContext);
  const [username, setUsername] = useState(user?.username || "");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profileImage || "");
  const [removeImage, setRemoveImage] = useState(false);

  const myBlogs = blogs.filter((blog) => blog.author._id === user.id);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setRemoveImage(false);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreviewUrl("");
    setRemoveImage(true);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }
      if (removeImage) {
        formData.append("removeProfileImage", "true");
      }

      const res = await axios.put(`${serverUrl}/api/users/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.user) {
        setUser(res.data.user);
        toast.success("Profile updated");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="profile-container">
      <p className="profile-title">Update Profile</p>
      <div className="profile-update">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={40}
        />
        <div className="profile-img-container">
          <label>
            <img
              src={previewUrl || assets.upload_user}
              alt="Profile"
              className={`profile-update-img ${
                previewUrl ? "profile-selected-img" : "upload-placeholder"
              }`}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>
        {previewUrl && (
          <button className="profile-pic-remove" onClick={handleRemoveImage}>
            Remove Profile Picture
          </button>
        )}
        <button className="profile-update-submit" onClick={handleSubmit}>
          Update
        </button>
      </div>
      <p className="profile-title">All Blogs</p>
      <div className="home-blogs-container">
        {myBlogs.length > 0 &&
          myBlogs.map((blog) => <DisplayBlog key={blog._id} blog={blog} />)}
      </div>
    </div>
  );
};

export default Profile;
