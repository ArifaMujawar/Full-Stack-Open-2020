import React from "react";

import Part from "./part.js";

const Content = ({ parts }) => (
  <>
    {parts.map((part) => {
      return <Part part={part} />;
    })}
  </>
);

export default Content;
