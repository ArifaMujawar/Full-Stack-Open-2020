import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewName = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = {
      name: newName,
    };
    const ca = persons.concat(temp);
    console.log(ca);
    setPersons(ca);
    setNewName("");
    persons.forEach((person) => console.log(person));
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNewName} value={newName} />
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => <p>{person.name}</p>)}
    </div>
  );
};

export default App;
