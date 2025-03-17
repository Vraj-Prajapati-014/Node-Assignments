// - Add error handling to the APIs that we built and try out.
// - Also, add a global error handler to handle


const express = require("express");
const jwt = require("jsonwebtoken");
const fs=require("fs").promises;
const path=require('path');
const key = "vraj";
const PORT = 3000;

const app = express();
const filepath=path.join(__dirname,"book.json");
app.use(express.json());


const getbook = async () => {
  try {
    const books = await fs.readFile(filepath, "utf-8");
    return JSON.parse(books);
  } catch (err) {
    console.error("Error reading file:", err);
    return [];
  }
};


const admin=[{name:'vraj',passwd:1234}];
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const verifytoken = (req, res, next) => {
  // const { name,passwd } = req.body;
  try {
    const header = req.headers["authorization"];
    if (header && header.startsWith("Bearer")) {
      const token = header.split(" ")[1];
      jwt.verify(token, key, (err, user) => {
        if (err) return res.status(403).json({ message: "invalid" });
        req.user = user;
        next();
      });
    } else {
       return res.status(401).json({ message: "no token" });
    }
  } catch (err) {
    next(err);
  }
};

app.post("/signin", (req, res,next) => {
  try {
    const { name,passwd } = req.body;
    const user = admin.find((u) => u.name === name && u.passwd === passwd);

    if (!user) {
      return res.status(401).json({ message: "wrong credential" });
    }
    const token = jwt.sign({ name:user.name }, key, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    next(err);
  }
});


app.get('/books',verifytoken,async (req,res,next)=>{
    try{
        const books=await getbook();
        res.json(books);
    }catch(err){
        next(err);
    }
});


app.use((err,req,res,next)=>{
  console.error("error: ",err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
);


app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
