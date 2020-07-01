import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/header.js";
import Content from "./components/content.js";
import Total from "./components/total.js";

const App = () => {
  const course = "Half Stack application development";
 
 
  const parts =[ {
    name: "Fundamentals of React",
    exercises: 10
  },
  {
    name: "Using props to pass data",
    exercises: 7
  },
   {
    name: "State of a component",
    exercises: 14,
  }
  ]
  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
