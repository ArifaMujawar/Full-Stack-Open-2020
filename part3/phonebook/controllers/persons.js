const personRouter = require("express").Router();
const Person = require('../models/persons');

personRouter.get("/", (req, res) => {
  Person.find({}).then((p) => {
    res.json(p);
  });
});

personRouter.get("/info", (req, res) => {
  const date = new Date();

  Person.find({}).then((p) => {
    res.send(`Phonebook has info for ${p.length} people <br/><br/>
   ${date}`);
  });
});

personRouter.get("/:id", (req, res, next) => {
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
personRouter.delete("/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((e) => next(e));
});

personRouter.put("/:id", (req, res, next) => {
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

personRouter.post("/", (req, res, next) => {
  const body = req.body;

  const data = new Person({
    name: body.name,
    phoneNumber: body.number,
  });
  data
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personRouter