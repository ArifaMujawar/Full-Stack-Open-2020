import React from "react";
import Header from "./header";
import Content from "./content";
import Total from "./total";

const Course = (props) => {
  return (
    <div>
      {props.course.map((c, i) => {
        return (
          <div key={i}>
            <Header course={c}  />
            <Content course={c} />
            <Total course={c}/>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
