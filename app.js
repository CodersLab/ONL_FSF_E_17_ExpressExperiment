var express = require('express');
var morgan = require('morgan');
var bodyParser = require("body-parser");

const users = [
  { name: 'Jan Kowalski', job: 'Software Engineer' }
];

const app = express();

const jsonParser = bodyParser.json();
app.use(jsonParser);


app.get('/users',(req,res)=>{
  res.json(users)
})

app.get('/users/:id',(req,res,next)=>{
  const id = parseInt(req.params.id);
  if(users[id]){
    res.send(users[id])
  }else{
    next(new Error(`No such user with id: ${id}!`))
  }
})

app.post("/users",(req,res)=>{
  const user = req.body;
  console.log({user})
  users.push(user)
  res.send(users)
})
app.put("/users/:id",(req,res,next)=>{
  const id = parseInt(req.params.id);
  if(users[id]){
    const newUser = {...users[id],...req.body}
    users[id] = newUser
    res.send(users)
  } else{
    next(new Error(`No such user with id: ${id}`))
  }
})

app.delete("/users/:id",(req,res,next)=>{
  const id = parseInt(req.params.id);
  if(users[id]){
    users.splice(id,1);
    res.send(users)
  }else{
    next(new Error(`No such user with id: ${id}`))
  }
})



app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});