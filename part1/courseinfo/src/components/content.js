import React from "react";

import Part from './part.js';

const Content = ({ part1, part2, part3 }) => (
  <>
    <Part part={part1}/>
    <Part part={part2}/>
    <Part part={part3}/>
  </>
);

export default Content;
