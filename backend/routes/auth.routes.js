import express from "express";
import {
  getMe,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

//TEST
// router.get("/", (req, res) => {
//   res.status(200).json({ message: "Success" });
// });

// @desc    Check If user is authenticated
// @route   GET /api/auth/me
router.get("/me", protectRoute, getMe);

// @desc    Auth Signup User
// @route   POST /api/auth/signup
router.post("/signup", signup);

// @desc    Login User
// @route   POST /api/auth/login
router.post("/login", login);

// @desc    Logout User
// @route   POST /api/auth/logout
router.post("/logout", logout);

export default router;
