// - Learn about middleware in express
// - Role of middleware.
// - Add signin, signup functionality in CRUD application using static username and password by managing array of users.
// - Explore JWT tokens and add middle-ware to check user is authenticated for accessing APIs that need to be access by only authenticated user. e.g `GET` `/books` API can be access after user is authenticated only.

const express=require("express");
const path=require("path");
const jwt=require('jsonwebtoken');
const fs=require("fs").promises;
const PORT=3000;
const key='vraj';

const app=express();
app.use(express.json());

app.use((req,res,next)=>{
  console.log(`${req.method} and ${req.url}`);
  next();
});

const users = [{ username: 'admin', password: 'admin123' }];
const verifytoken=(req,res,next)=>{
const header=req.headers['authorization'];
if(header && header.startsWith('Bearer')){
    const token=header.split(" ")[1];
    jwt.verify(token,key,(err,user)=>{
        if (err) return res.status(403).json({message:"token is not valid"});
        req.user=user;
        next();
    });
}
else {
    res.status(401).json({ message: 'No token provided' });
}
}


app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(409).json({ message: 'User already exists' });
    }
    users.push({ username, password });
    res.json({ message: 'registered successfully' });
});


app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: user.username }, key, { expiresIn: '1h' });
    res.json({ token });
});


app.get('/books', verifytoken, (req, res) => {
    res.json({ message: 'Showing books', user: req.user });
});


app.listen(PORT,()=>{
console.log(`http://localhost:${PORT}`);
});