import React, { useState, useEffect } from "react";
import axios from "axios";

import dataService from "./services/dataService";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import Filter from "./components/filter";
import Notification from "./components/Notification";

import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    dataService.getAll().then((response) => {
      console.log("response ", response.data);
      setPersons(response.data);
    });
  }, [newName, number]);

  useEffect(() => {
    console.log("error message updated");
  }, [errorMessage, status]);
  const handleStatus = (s) => {
    setStatus(s);
  };
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
  const search = (value) => {
    let filtered = persons.filter((o) => o.name.toLowerCase().includes(value));
    setSearchResults(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.length > 0 && number.length > 0) {
      if (
        persons.some(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        )
      ) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one`
          )
        ) {
          const data = persons.find(
            (p) => p.name.toLowerCase() === newName.toLowerCase()
          );

          dataService
            .update(data.id, { name: newName, number: number })
            .then(() => {
              setErrorMessage(`Edited ${newName}, success`);
              setStatus("success");
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            });
        }
        setNewName("");
        setNumber("");
      } else {
        //setPersons(persons.concat({ name: newName, number: number }));
        dataService
          .create({ name: newName, number: number })
          .then((returnedData) => {
            setPersons(persons.concat(returnedData));
            setErrorMessage(`Added ${newName}, success`);
            setStatus("success");
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setNewName("");
            setNumber("");
          })
          .catch((error) => {
            console.log(error.response.data);
            setErrorMessage(error.response.data, "error");
            setStatus("error");
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      console.log("missing name or number");
      setStatus("error");
      setErrorMessage("missing name or number, error");
      
      setTimeout(() => {
        setErrorMessage(null);
        setStatus(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <Notification message={errorMessage} status={status} />}
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
        setErrorMessage={setErrorMessage}
        setPersons={setPersons}
        persons={persons}
        setStatus={handleStatus}
      />
    </div>
  );
};

export default App;
