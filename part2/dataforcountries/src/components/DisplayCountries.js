import React from "react";
import DisplayCountryInfo from "./DisplayCountryInfo";

const DisplayCountries = (props) => {
  return (
    <div>
      {props.data.length === 1
        ? props.data.map((o, i) => <DisplayCountryInfo o={o} i={i} />)
        : props.data.map((o, i) => <p key={i}>{o.name}</p>)}
    </div>
  );
};

export default DisplayCountries;
