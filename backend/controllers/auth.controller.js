import { generateTokanAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

// @desc    Auth Signup User
// @route   POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    //Get values from req.body
    const { username, email, nickname, password } = req.body;

    //Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    //Check Email exist
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    //Check username exist
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    //Check Password Length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Prepare User Object
    const newUser = new User({
      username,
      email,
      nickname,
      password: hashedPassword,
    });

    //When User is prepare Create JWT Token and Save user in DB
    if (newUser) {
      generateTokanAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        nickname: newUser.nickname,
        userAvatar: newUser.userAvatar,
        profileImage: newUser.profileImage,
        profileText: newUser.profileText,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Login User
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    //Get Values
    const { email, password } = req.body;

    //Find user in db By email
    const user = await User.findOne({ email });

    //Check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    //Generate Token
    generateTokanAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      nickname: user.nickname,
      userAvatar: user.userAvatar,
      profileImage: user.profileImage,
      profileText: user.profileText,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Logout User
// @route   POST /api/auth/logout
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    Check If user is autenticated
// @route   POST /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
