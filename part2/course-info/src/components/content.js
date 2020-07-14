import React from 'react';
import Part from './part';
const Content = ({ course }) => {
  return (
    <div>
    {course.parts.map((p,i)=><Part key={i} part={p} />)}
      
    </div>
  )
}

export default Content;