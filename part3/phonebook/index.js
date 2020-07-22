const express = require("express");
require('dotenv').config()
const Person = require('./models/persons')

const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");


// const Person = mongoose.model("Person", personSchema);


app.use(express.json());
app.use(express.static("build"));
app.use(cors());
// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: 4,
//   },

// ];
//app.use(morgan('tiny'));

morgan.token("host", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :host")
);
app.get("/", (req, res) => {
  res.send("<h1>Hello ohh world");
});

app.get("/api/persons", (req, res) => {
  console.log('In api/persons');
  Person.find({}).then((p) => {
    res.json(p);
    console.log('p value ',p);
  });
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`Phonebook has info for ${persons.length} people <br/><br/>
   ${date}`);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  person = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  // const random = Math.floor(Math.random() * 100);
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
   }
   //else if (
  //   persons.some((p) => p.name.toLowerCase() === body.name.toLowerCase())
  // ) {
  //   return res.status(400).json({
  //     error: "name already exists",
  //   });
  // }
  const data = new Person({
    name: body.name,
    phoneNumber: body.number,
    // id: random,
  });
  // persons = persons.concat(data);
  data.save().then(savedPerson=>{
    res.json(savedPerson);
  }).catch((e)=>{
    console.log('error ', e);
  })
  
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
