import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" , number: '040-1233467'}]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState('');

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.length > 0 && number.length > 0) {
      if (persons.some((person) => person.name === newName)) {
        alert(`${newName} is already added to phonebook`);
        setNewName("");
        setNumber('');
      } else {
        setPersons(persons.concat({ name: newName , number: number}));
        setNewName("");
        setNumber('');
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNewName} value={newName} />
        </div>
        
        <div>
        number: <input onChange={handleNumber} value={number} />
        </div>
        <div>
          <button onClick={handleSubmit} type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => (
        <p key={i}>{person.name} {person.number}</p>
      ))}
    </div>
  );
};

export default App;
