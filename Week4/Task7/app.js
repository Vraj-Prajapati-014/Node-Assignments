const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

const tasks=[];

app.get('/',(req,res)=>{
  res.render('index',{tasks})
});

app.post('/add', (req, res) => {
  tasks.push({ name: req.body.task, completed: false });
  res.redirect('/');
});

app.get('/complete/:index', (req, res) => {
  const index = req.params.index;
  if (tasks[index]) tasks[index].completed = true;
  res.redirect('/');
});

app.get('/delete/:index', (req, res) => {
  tasks.splice(req.params.index, 1);
  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
