import React from "react";
import dataService from "../services/dataService";

const Person = (props) => {
  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      dataService
        .deletePerson(id)
        .catch((e) => {
          console.log(e);
          props.setErrorMessage(
            `Information of ${name} has already been removed from server`,
            "error"
          );
          setTimeout(() => {
            props.setErrorMessage(null);
          }, 5000);
        })
        .then((returnedData) => {
          props.setPersons(props.persons.filter((i) => i.name !== name));
        });
    }
  };
  return (
    <div>
    {props.personArray.map((person, i) => (
        <p key={i}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.name, person.id)}>
            Delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Person;
