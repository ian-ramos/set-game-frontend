import React, { Component } from 'react';

const Timer = (props) => {

  return(
    <div>
      <h1>{props.time} second{props.time === 1 ? null : 's'} left!</h1>
    </div>
  )

}

Timer.defaultProps = {

}

export default Timer;
