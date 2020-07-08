import React, { useState, useEffect } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchResults, setSearchResults] = useState('');
  useEffect(()=>{console.log('filter value from useEffect ', filterValue)},[filterValue]);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleFilterName = (e) => {
    const value = e.target.value;
    
      setFilterValue(value.toLowerCase());
      search(filterValue);
    
   
  };
  const search =(value)=>{
    
    let filtered = persons.filter((o) => o.name.toLowerCase().includes(value));
    console.log('search item ',filtered);
    setSearchResults(filtered);
    console.log('value ',value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.length > 0 && number.length > 0) {
      if (persons.some((person) => person.name === newName)) {
        alert(`${newName} is already added to phonebook`);
        setNewName("");
        setNumber("");
      } else {
        setPersons(persons.concat({ name: newName, number: number }));
        setNewName("");
        setNumber("");
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input onChange={handleFilterName} value={filterValue} />
      </div>
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
      {filterValue ? searchResults.map((person, i)=>(<p key={i}>
        {person.name} {person.number}
      </p>)):persons.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
