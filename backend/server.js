import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectDB from "./db/connectDB.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

//Main Path
app.get("/", (req, res) => {
  res.send("Server is ready");
});
//Middleware
app.use("/api/auth", authRoutes);

//Server Listener
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
