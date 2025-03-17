// - Explore what is formData in HTTP.
// - Add file upload API that stores files in your project folder named `myFiles` . Check that file size is not larger than 5 MB and it’s only jpg file.
// - Hint: use [multer](https://www.npmjs.com/package/multer) npm package

import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const app=express();
const PORT=3000;

const __filename=fileURLToPath(import.meta.url);
const __dirname=dirname(__filename);
const Uploadpath=path.join(__dirname,"myFiles");

if (!fs.existsSync(Uploadpath)) {
  fs.mkdirSync(Uploadpath, { recursive: true });
}


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,Uploadpath);
    },
    filename:(req,file,cb)=>{
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg") {
      cb(null, true); 
    } else {
      cb(new Error("Only JPG files are allowed!"), false);
    }
  };

  const upload=multer({
    storage,
    limits:{fileSize:5*1024*1024},
    fileFilter,
  })

  app.get("/upload", (req, res) => {
    fs.readdir(Uploadpath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return res.status(500).json({ error: "Error fetching files" });
      }
      res.status(200).json({ files });
    });
  });
  

  app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded or invalid format!" });
    }
    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file.filename,
    });
  });

  app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  });
  

app.listen(PORT,()=>{
    console.log("server is running on port",PORT);
})

