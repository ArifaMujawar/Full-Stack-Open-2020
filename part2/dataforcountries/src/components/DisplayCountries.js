import React, { useState } from "react";
import DisplayCountryInfo from "./DisplayCountryInfo";

const DisplayCountries = (props) => {
  const [newCountry, setNewCountry] = useState("");
  const handleShow = (country) => {
    setNewCountry(country);
  };
  return (
    <div>
      {props.data.length === 1
        ? props.data.map((o, i) => <DisplayCountryInfo o={o} i={i} />)
        : props.data.map((o, i) => {
            return (
              <div>
                <p key={i}>{o.name}</p>
                <button onClick={() => handleShow(o.name)}>show</button>
                {newCountry && <DisplayCountryInfo o={o} key={i} />}
              </div>
            );
          })}
    </div>
  );
};

export default DisplayCountries;
