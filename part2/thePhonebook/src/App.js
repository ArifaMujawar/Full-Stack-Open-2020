import React, { useState, useEffect } from "react";
import axios from 'axios';
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import Filter from "./components/filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchResults, setSearchResults] = useState("");
  
  useEffect(()=>{
    console.log('effect');
    axios.get('http://localhost:3001/persons').then((response)=>{
      console.log('promise fulfilled');
      setPersons(response.data);
    })
  },[]);

  useEffect(() => {
    console.log("filter value from useEffect ", filterValue);
    search(filterValue);
  }, [filterValue]);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleFilterName = (e) => {
    const value = e.target.value;

    setFilterValue(value.toLowerCase());
    //search(filterValue);
  };
  const search = (value) => {
    let filtered = persons.filter((o) => o.name.toLowerCase().includes(value));
    console.log("search item ", filtered);
    setSearchResults(filtered);
    console.log("value ", value);
  };

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
      <Filter handleFilterName={handleFilterName} filterValue={filterValue} />
      <h3>Add a new </h3>
      <PersonForm
        handleNewName={handleNewName}
        newName={newName}
        handleNumber={handleNumber}
        number={number}
        handleSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons
        filterValue={filterValue}
        searchResults={searchResults}
        persons={persons}
      />
    </div>
  );
};

export default App;
