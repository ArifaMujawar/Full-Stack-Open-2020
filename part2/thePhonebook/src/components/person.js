import React from 'react';

const Person = (props) => {
  return(
    <div>
    {props.personArray.map((person, i)=>(<p key={i}>
      {person.name} {person.number}
    </p>))}
  </div>
  )
};

export default Person;