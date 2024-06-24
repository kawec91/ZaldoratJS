import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
<<<<<<< HEAD
import startRoutes from "./routes/start.routes.js";
=======
>>>>>>> 38b9ffbb1fd2253824e0b67168f62695e408e87a

import connectDB from "./db/connectDB.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

//Main Path
app.get("/api", (req, res) => {
  res.send("Server is ready");
});

//Middleware - run between request and response
//Parse req.body
app.use(express.json());
//Parse data(urlencoded)
app.use(express.urlencoded({ extended: true }));
//
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/start", startRoutes);
//Server Listener
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api`);
  connectDB();
});
