import React from "react";

const DisplayCountryInfo = ({ o, i }) => {
  return (
    <div>
      <h2 key={i}>{o.name}</h2>
      <ul>
        <li> capital {o.capital}</li>
        <li>population {o.population}</li>
      </ul>
      <h3>languages</h3>
      <ul>
        {o.languages.map((l, index) => {
          return <li key={index}>{l.name}</li>;
        })}
      </ul>
      <img
        alt="flag"
        src={o.flag}
        style={{ height: "100px", width: "100px" }}
      />
    </div>
  );
};

export default DisplayCountryInfo;
