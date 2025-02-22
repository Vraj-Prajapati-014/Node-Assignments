// - Know difference between http and https.
// - Create `server.js` file in that you create http server using node js ‘http’ module.
// - Read about REST APIs. GET, POST, PUT, DELETE. There are PATCH and TRACE but not mostly used so you can read brief about it.
// - Create one JSON array of object which is containing books.
// - Implement GET, POST, PUT, DELETE basically CRUD APIs using built in http module only and use the file system as persistence data storage and to store JSON that you created in last step.
// 1. Get all the books.
// 2. Get a book by id.
// 3. Create a book.
// 4. Modify a book.
// 5. Delete a book.
// - Install [Postman](https://www.postman.com/) to test out the all APIs.

const http=require("http");
const fs=require("fs");
const path=require("path");
const { json } = require("stream/consumers");

const PORT=3000;
const filepath= path.join(__dirname,'data.json')

const server=http.createServer((req,res)=>{
    const {method,url}=req;
    if(method==='GET' && url=== '/books'){
        fs.readFile(filepath,(err,data)=>{
            if(err){
                res.writeHead(500,{"content-type":"application/json"});
                res.end(JSON.stringify({message:"Error in read"}));
            }
            else{
                res.writeHead(200,{"content-type":"application/json"});
                res.end(data);
            }
        })
    }
    else if (method === "GET" && url.startsWith("/books/")) {
        const id = parseInt(url.split("/")[2], 10); 
        fs.readFile(filepath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "Error reading file" }));
            }
            const books = JSON.parse(data);
            const book = books.find(n => n.id === id);  
            if (book) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(book));
            } else {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Book not found" }));
            }
        });
    }
    else if(method==='POST' && url==='/books'){
        let body='';
        req.on('data',n=>{body+=n;});
        req.on('end',()=>{
            fs.readFile(filepath,(err,data)=>{
                const books=err?[]:JSON.parse(data);
                const newbook=JSON.parse(body);
                books.push(newbook);
                fs.writeFile(filepath,JSON.stringify(books),(err)=>{
                    res.writeHead(500,{"content-type":"application/json"})
                    res.end(JSON.stringify(err? {message:"can't create new file"}:newbook))
                })
            })
         })
    }
    else if (method === 'PUT' && url.startsWith('/books/')) {
        const id = parseInt(url.split("/")[2], 10); 
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            fs.readFile(filepath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Error reading file' }));
                } else {
                    const books = JSON.parse(data);
                    const index = books.findIndex(b => b.id === id);
                    if (index !== -1) {
                        books[index] = JSON.parse(body);
                        fs.writeFile(filepath, JSON.stringify(books, null, 2), (err) => {
                            res.writeHead(err ? 500 : 200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(err ? { message: 'Error writing file' } : books[index]));
                        });
                    } else {
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Book not found' }));
                    }
                }
            });
        });
    } else if (method === 'DELETE' && url.startsWith('/books/')) {
        const id = parseInt(url.split("/")[2], 10); 
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error reading file' }));
            } else {
                let books = JSON.parse(data);
                books = books.filter(b => b.id !== id);
                fs.writeFile(filepath, JSON.stringify(books, null, 2), (err) => {
                    res.writeHead(err ? 500 : 200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(err ? { message: 'Error writing file' } : { message: 'Book deleted' }));
                });
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});



server.listen(PORT, () => {
    console.log(`Running on: http://localhost:${PORT}`);

});