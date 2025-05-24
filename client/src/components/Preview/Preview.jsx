import React from "react";
import "./Preview.css";
import { useContext } from "react";
import { BlogContext } from "../../context/BlogContext";

const Preview = ({ setPreview }) => {
  const { logout } = useContext(BlogContext);
  return (
    <div className="preview-container">
      <div className="preview-box">
        <p>Are you sure you want to log out?</p>
        <div className="preview-ask">
          <button onClick={() => setPreview(false)} className="pre-cancel">
            Cancel
          </button>
          <button
            className="pre-confirm"
            onClick={() => {
              logout();
              setPreview(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
