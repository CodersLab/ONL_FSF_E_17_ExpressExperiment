var express = require('express');
var router = express.Router();

const users = [
  { name: 'Jan Kowalski 1', job: 'Software Engineer' },
  { name: 'Jan Kowalski 2', job: 'Software Engineer' },
  { name: 'Jan Kowalski 3', job: 'Software Engineer' },
  { name: 'Jan Kowalski 4', job: 'Software Engineer' },
  { name: 'Jan Kowalski 5', job: 'Software Engineer' }
];


/* GET users listing. */

router.get('/',(req,res)=>{
  res.json(users)
})

router.get('/:id',(req,res,next)=>{
  const id = parseInt(req.params.id);
  if(users[id]){
    res.send(users[id])
  }else{
    next(new Error(`No such user with id: ${id}!`))
  }
})

router.post("/",(req,res)=>{
  const user = req.body;
  console.log({user})
  users.push(user)
  res.send(users)
})
router.put("/:id",(req,res,next)=>{
  const id = parseInt(req.params.id);
  if(users[id]){
    const newUser = {...users[id],...req.body}
    users[id] = newUser
    res.send(users)
  } else{
    next(new Error(`No such user with id: ${id}`))
  }
})

router.delete("/:id",(req,res,next)=>{
  const id = parseInt(req.params.id);
  if(users[id]){
    users.splice(id,1);
    res.send(users)
  }else{
    next(new Error(`No such user with id: ${id}`))
  }
})


module.exports = router;
