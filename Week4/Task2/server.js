// - Before calling any POST, PUT, DELETE APIs that we developed for book management, check that user is only admin/librarian.
// - You can pass header named `role=’admin’`

const express = require("express");
// const { json } = require("body-parser");
const fs = require("fs").promises;
const path = require("path");
const port=3000;

const filepath = path.join(__dirname, "book.json");

const app = express();
app.use(express.json());

const admin = (req, res, next) => {
  if (req.headers.role !== "admin") {
    return res.status(400).json({ message: "admin only" });
  }
  next();
};

const getbook = async () => {
  try {
    const data = await fs.readFile(filepath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("can't get book", err);
    return [];
  }
};

const savebook=async(book)=>{
    try{
        await fs.writeFile(filepath,JSON.stringify(book,null,2),"utf8");
    } catch (err) {
        console.error("can't save book", err);
      }
};

app.get("/books",async (req,res)=>{
        const book= await getbook();
        res.json(book);
})

app.get("/books/:id",async (req,res)=>{
    const books= await getbook();
    const book=books.find((n)=>{id===parseInt(req.params.id)});
    if(!book){
        return res.json({message:"can't get id"});
        
    }
    res.json(book);
})

app.post("/books",admin,async (req,res)=>{
    const books=await getbook();
    const newbook={id:books.lenght+1,...req.body};
    books.push(newbook);
    await savebook(books);
    res.json(newbook);
})

app.put("/books/:id",admin,async (req,res)=>{
    const books= await getbook();
    const book=books.findIndex((n)=>{id===parseInt(req.params.id)});
    if(!book){
        return res.json({message:"can't get id"});
        
    }
    books[book]={...books[book], ...req.body};
    await savebook(books);
    res.json(books[book]);
})

app.delete("/books/:id",admin, async (req, res) => {
    let books = await getbook();
    const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    books.splice(bookIndex,1);
    await savebook(books);
  
    res.json({ message: "Book deleted successfully" });
  });

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
});