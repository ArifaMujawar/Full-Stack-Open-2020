import React from "react";
import Person from './person';

const Persons = (props) => {
  return (
    <div>
      {props.filterValue ? (
        <Person personArray={props.searchResults} setErrorMessage={props.setErrorMessage}
        setPersons={props.setPersons}
        persons={props.persons}
        setStatus={props.setStatus}
        />
      ) : (
        <Person personArray={props.persons} setErrorMessage={props.setErrorMessage}
        setPersons={props.setPersons}
        persons={props.persons}
        setStatus={props.setStatus}
        />
      )}
    </div>
  );
};

export default Persons;
