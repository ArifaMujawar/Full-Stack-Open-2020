import React from 'react';

const Notification = ({message, status}) => {
  console.log('status value ', status);
  if(status == "error"){
    return(
      <div className='error'>
      {message} 
      </div>
    );
  }
return(
  <div className='message'>
  {message} 
  </div>
);
}

export default Notification;