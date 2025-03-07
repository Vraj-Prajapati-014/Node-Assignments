const express=require("express");
const fs=require("fs").promises;
const path=require("path");
const { json } = require("stream/consumers");

const app=express();
const  port=3000;
const filepath=path.join(__dirname,"book.json");

app.use(express.json());

const getbook= async ()=>{
try{
    const data=await fs.readFile(filepath,"utf8");
    return JSON.parse(data);
}catch(err){
 console.error("can't get books");
 return [];
}
};

const savebook=async(books)=>{
    try{
        await fs.writeFile(filepath,JSON.stringify(books,null,2),"utf8");
    }catch(err){
        console.log("can't save file");
    }
};

app.get("/books",async (req,res)=>{
    const book=await getbook();
    res.json(book);
})

app.get("/books/:id",async(req,res)=>{
    const books= await getbook();
    const book=books.find((n)=>n.id===parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
});

app.post("/books", async (req,res)=>{
    const books= await getbook();
    const newbook={id:books.length+1,...req.body}; 
    books.push(newbook);
    await savebook(books);
    res.status(200).json(books);
});

app.put("/books/:id",async (req,res)=>{
    const books= await getbook();
    const book=books.findIndex((n)=>n.id===parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
    books[book]={...books[book],...req.body};
    await savebook(books);
    res.json(books[book]);
})

app.delete("/books/:id", async (req, res) => {
    let books = await getbook();
    const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    books = books.filter((b) => b.id !== parseInt(req.params.id));
    await savebook(books);
  
    res.json({ message: "Book deleted successfully" });
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });