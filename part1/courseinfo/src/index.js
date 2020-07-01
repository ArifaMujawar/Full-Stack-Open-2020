import React from "react";
import ReactDOM from "react-dom";

import Header from "./components/header.js";
import Content from "./components/content.js";
import Total from "./components/total.js";

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    "Fundamentals of React",
    "Using props to pass data",
    "State of a component",
  ];
  const exercises = [10, 7, 14];

  return (
    <>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises[0] + exercises[1] + exercises[2]} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
