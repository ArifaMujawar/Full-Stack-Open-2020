import React from "react";
import Person from './person';

const Persons = (props) => {
  return (
    <div>
      {props.filterValue ? (
        <Person personArray={props.searchResults} />
      ) : (
        <Person personArray={props.persons} />
      )}
    </div>
  );
};

export default Persons;
