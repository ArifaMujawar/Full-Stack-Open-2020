import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Index = () => {
  const [country, setCountry] = useState("");
  const [data, setData] = useState("");

  const handleCountryName = (e) => {
    console.log(e.target.value);
    setCountry(e.target.value);
  };
  useEffect(() => {
    console.log("effect");
    axios
      .get(` https://restcountries.eu/rest/v2/name/${country}`)
      .then((response) => {
        console.log("promise fulfilled");
        setData(response.data);
      });
  }, [country]);
  console.log("data is ", data);
  return (
    <div>
      find countries
      <input onChange={handleCountryName} value={country} />
      {country.length > 0 &&
        data &&
        (Object.keys(data).length < 10 ? (
          data.map((o, i) => {
            console.log("length of single country ", i);
            if (i === 0) {
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
                  <img alt="flag" src={o.flag} style={{height:'100px',width:'100px'}}/>
                </div>
              );
            }
            return <p key={i}>{o.name}</p>;
          })
        ) : (
          <p>Too many countries</p>
        ))}
    </div>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
