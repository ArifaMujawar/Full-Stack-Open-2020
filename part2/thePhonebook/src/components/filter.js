import React from 'react';

const Filter = (props) => {
  return(
    <div>
    filter shown with 
    <input onChange={props.handleFilterName} value={props.filterValue} />
  </div>
  )
};

export default Filter;