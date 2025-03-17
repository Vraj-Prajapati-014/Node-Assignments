// This task is just added to aware you about the needed security while building any NodeJs application.

// - Learn how to make the server more secure
// - Learn about XSS and CSRF
// - Integrate helmet npm package in you application and also take overview how it work
// - Learn about CORS and add it in your server
// - Integrate rate-limiter.

import express from "express";
import helmet from "helmet";
import ratelimit from "express-rate-limit";
import cors from "cors";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import exp from "constants";
import { json } from "stream/consumers";

const key = "vraj";
const port = 8000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filepath = path.join(__dirname, "book.json");

app.use(express.json());
app.use(helmet());
app.use(cors());

const Ratelimitor = ratelimit({
  windowMs: 2 * 1000 * 60,
  max: 2,
  message: "Too many attemps try after 2 minutes",
});
app.use(Ratelimitor);

const getbook = async () => {
  try {
    const books = await fs.readFile(filepath, "utf-8");
    return JSON.parse(books);
  } catch (err) {
    console.log("error fetching books", err);
    return [];
  }
};

const admin = [{ name: "vraj", passwd: 1234 }];

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const verifytoken = (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    if (headers && headers.startsWith("Bearer")) {
      const token = headers.split(" ")[1];
      jwt.verify(token, key, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({ message: "No token provided" });
    }
  } catch (err) {
    next(err);
  }
};

app.get("/books", verifytoken, async (req, res, next) => {
    try {
      const books = await getbook();
      res.json(books);
    } catch (err) {
      next(err);
    }
  });

  app.post("/signin", (req, res, next) => {
    try {
      const { name, passwd } = req.body;
      const user = admin.find((u) => u.name === name && u.passwd === passwd);
  
      if (!user) {
        return res.status(401).json({ message: "Wrong credentials" });
      }
  
      const token = jwt.sign({ name: user.name }, key, { expiresIn: "1h" });
      res.json({ token });
    } catch (err) {
      next(err);
    }
  });

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
