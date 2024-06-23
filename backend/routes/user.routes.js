import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

//TEST
// router.get("/", (req, res) => {
//   res.status(200).json({ message: "Success" });
// });

// @desc    Check If user is authenticated
// @route   GET /api/user/profile
router.get("/profile/:email", protectRoute, getUserProfile);

export default router;
