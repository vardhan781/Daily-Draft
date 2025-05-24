import express from "express";
import { login, signup, updateProfile } from "../controllers/userController.js";
import upload from "../config/multer.js";
import { verifyToken } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("profileImage"), signup);
userRouter.post("/login", login);
userRouter.put(
  "/update",
  verifyToken,
  upload.single("profileImage"),
  updateProfile
);

export default userRouter;
