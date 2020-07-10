import React from "react";

const InputCountry = (props) => {
  return (
    <div>
      find countries
      <input onChange={props.handleCountryName} value={props.country} />
    </div>
  );
};

export default InputCountry;
