const express = require("express");
require("dotenv").config();
const Person = require("./models/persons");

const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const { response } = require("express");

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
  res.send("<h1>Hello ohh world</h1>");
});

app.get("/api/persons", (req, res) => {
  console.log("In api/persons");
  Person.find({}).then((p) => {
    res.json(p);
    console.log("p value ", p);
  });
});

app.get("/info", (req, res) => {
  console.log("within /info");
  const date = new Date();

  Person.find({}).then((p) => {
    res.send(`Phonebook has info for ${p.length} people <br/><br/>
   ${date}`);
  });
});
app.get("/api/persons/:id", (req, res, next) => {
  // const id = Number(req.params.id);
  // const person = persons.find((p) => p.id === id);
  // if (person) {
  //   res.json(person);
  // } else {
  //   res.status(404).end();
  // }
  Person.findById(req.params.id)
    .then((p) => {
      if (p) {
        res.json(p);
      } else {
        res.status(400).end();
      }
    })
    .catch((e) => next(e));
});
app.delete("/api/persons/:id", (req, res, next) => {
  // const id = Number(req.params.id);
  // person = persons.filter((p) => p.id !== id);
  // res.status(204).end();
  Person.findByIdAndRemove(req.params.id)
    .then((res) => {
      res.status(204).end();
    })
    .catch((e) => next(e));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    phoneNumber: body.phoneNumber,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((e) => next(e));
});

app.post("/api/persons", (req, res, next) => {
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
  data
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
