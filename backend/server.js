import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import startRoutes from "./routes/start.routes.js";
import characterRoutes from "./routes/character.routes.js";
import connectDB from "./db/connectDB.js";
import raceRoutes from './routes/race.routes.js';
import classRoutes from './routes/class.routes.js';
import locationRoutes from './routes/location.routes.js';
import sublocationRoutes from './routes/sublocation.routes.js';
import originRoutes from './routes/origin.routes.js';
import deityRoutes from './routes/deity.routes.js';
import changelogRoutes from './routes/changelog.routes.js';
import backpackRoutes from './routes/backpack.routes.js';
import resourceRoutes from './routes/resource.routes.js';
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
app.use('/api/characters', characterRoutes);
app.use("/api/races", raceRoutes); 
app.use("/api/classes", classRoutes);
app.use('/api', locationRoutes);
app.use('/api', sublocationRoutes);
app.use('/api/origin', originRoutes);
app.use('/api/deities', deityRoutes);
app.use('/api/changelogs', changelogRoutes);
app.use('/api/backpack', backpackRoutes);
app.use('/api/resources', resourceRoutes);

//Server Listener
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api`);
  connectDB();
});
