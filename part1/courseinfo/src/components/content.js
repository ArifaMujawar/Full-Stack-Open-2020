import React from "react";

import Part from './part.js';

const Content = ({ parts, exercises }) => (
  <>
    <Part parts={parts[0]} exercises={exercises[0]}/>
    <Part parts={parts[1]} exercises={exercises[1]}/>
    <Part parts={parts[2]} exercises={exercises[2]}/>
  </>
);

export default Content;
