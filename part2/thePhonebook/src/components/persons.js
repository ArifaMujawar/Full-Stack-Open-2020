import React from "react";
import Person from './person';

const Persons = (props) => {
  return (
    <div>
      {props.filterValue ? (
        <Person personArray={props.searchResults} setErrorMessage={props.setErrorMessage}
        setPersons={props.setPersons}
        persons={props.persons}
        />
      ) : (
        <Person personArray={props.persons} setErrorMessage={props.setErrorMessage}
        setPersons={props.setPersons}
        persons={props.persons}
        />
      )}
    </div>
  );
};

export default Persons;
