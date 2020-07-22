const mongoose = require("mongoose");
const password = process.argv[2];

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const url = `mongodb+srv://Admin:${password}@cluster0.dcvdw.mongodb.net/<phonebook>?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Person = mongoose.model("Person", personSchema);
if (process.argv.length < 5) {
  Person.find({}).then((persons) => {
    console.log("phonebook:");
    persons.forEach((p) => {
      console.log(p.name + " " + p.phoneNumber);
    });
    mongoose.connection.close();
  });
} else {
  const per = new Person({
    name: process.argv[3],
    phoneNumber: process.argv[4],
  });

  per.save().then((result) => {
    console.log(
      `added ${result.name} number ${result.phoneNumber} to phonebook`
    );
    mongoose.connection.close();
  });
}
