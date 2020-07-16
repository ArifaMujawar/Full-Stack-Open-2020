const express = require("express");
const app = express();
const moment = require('moment');
app.use(express.json())
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Yusra",
    number: "2389 23380",
    id: 5,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello ohh world");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const date = moment().format('LLLL  HH:MM:SS Z+2');;
  console.log("date ", date);
  res.send(`Phonebook has info for ${persons.length} people <br/><br/>
   ${date}`);
});
app.get('/api/persons/:id',(req, res)=>{
const id = Number(req.params.id)
const person = persons.find(p=>p.id === id)
if(person){
  res.json(person)
  }else{
    res.status(404).end()
  }
})
app.delete('/api/persons/:id', (req,res)=>{
const id = Number(req.params.id)
person =persons.filter(p=> p.id !== id)
res.status(204).end()
});

//working here
app.post('/api/persons', (req,res)=>{ 
const random = Math.floor(Math.random()*100) 
console.log('random ', random);
const body = req.body
console.log('body ', body);
if(!body.name || !body.number){
return res.status(400).json({
  error: 'name or number missing'
})
}else if(persons.some(p =>p.name.toLowerCase() ===body.name.toLowerCase())){
  return res.status(400).json({
    error: 'name already exists'
  })
}
const data = {
 name:body.name,
 number:body.number,
  id: random,
}
console.log('data is ', data);
persons = persons.concat(data)
res.json(data)

})

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
