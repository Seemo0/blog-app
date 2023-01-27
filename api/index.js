import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import fs from "fs";
const uploadMiddleware = multer({ dest: "uploads/" });
import User from "./models/User.js";

dotenv.config();
const app = express();

const salt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.jwtSecret;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL);

app.get("", (req, res) => {
  res.json("is it working!!!!");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const isMatch = bcrypt.compareSync(password, user.password);
  if (isMatch) {
    // logged in
    jwt.sign({ username, id: user._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({ id: user._id, username });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Bye");
});

app.listen(4001, () => console.log("App listening on PORT 4001"));
