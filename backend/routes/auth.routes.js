import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

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
